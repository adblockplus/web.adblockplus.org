/* global adblock, Paddle */
import Events from "./events.js";

const PADDLE_LIVE_TOKEN = "live_d10b49fa5fc207ade026db6535c";
const PADDLE_TEST_TOKEN = "test_b0e15dc1f1e4f20b0fe6396e893";

// CAUTION: Add experiment prices to PADDLE_EXPERIMENT_PRICES below instead
const PADDLE_PRICES = {
  test: {
    "premium": {
      "USD": {
        "monthly": {
          "400": "pri_01j8m8j8945gk9mv9hxd3ykmtm"
        },
        "yearly": {
          "4000": "pri_01j8m8j8p25fdrsde138c9n4ef"
        }
      },
      "EUR": {
        "monthly": {
          "400": "pri_01j8m8j937a41kvwrsz2z996xj"
        },
        "yearly": {
          "4000": "pri_01j8m8j9fvb0vnxt276c6gbk59"
        }
      },
      "CAD": {
        "monthly": {
          "400": "pri_01j8m8j9w2eag4k5px5hf8qk9r"
        },
        "yearly": {
          "4000": "pri_01j8m8ja906bjxpysjydt7bdy7"
        }
      },
      "GBP": {
        "monthly": {
          "400": "pri_01j8m8jap4rmvqsafxdpejy91q"
        },
        "yearly": {
          "4000": "pri_01j8m8jb2r2dmg32q31jfp03n4"
        }
      },
      "AUD": {
        "monthly": {
          "400": "pri_01j8m8jbftsgr2nvj01q93m398"
        },
        "yearly": {
          "4000": "pri_01j8m8jbvz4gbvtfejc0ede1y5"
        }
      },
      "NZD": {
        "monthly": {
          "400": "pri_01j8m8jc802v7d8cv4gmrntgnp"
        },
        "yearly": {
          "4000": "pri_01j8m8jcn1kcymtgq3f5y25e2y"
        }
      },
      "CHF": {
        "monthly": {
          "400": "pri_01j8m8jd28d47sn96y0t0x65t4"
        },
        "yearly": {
          "4000": "pri_01j8m8jdemv7xfp2eqm289h2ej"
        }
      },
      "PLN": {
        "monthly": {
          "1499": "pri_01j8m8jdv87a0h5x7c32b0e5hz"
        },
        "yearly": {
          "14999": "pri_01j8m8je7w3jz268d02t046g11"
        }
      },
      "JPY": {
        "monthly": {
          "600": "pri_01j8m8jek6r0f6zptrh9y9ngpb"
        },
        "yearly": {
          "6000": "pri_01j8m8jf51d1mbd9stgz9956cq"
        }
      },
      "RUB": {
        "monthly": {
          "35000": "pri_01j8m8jfv53fqj7w9w17rz4ceh"
        },
        "yearly": {
          "350000": "pri_01j8m8jgfrcbq9xerszs9a9wt3"
        }
      }
    },
    "contribution": {
      "USD": {
        "once": {
          "1000": "pri_01j8m8jhfj2ze1ztvdr3ahec3t",
          "1500": "pri_01j8m8jj3a8wx1nhz3mhejdq74",
          "2000": "pri_01j8m8jjkqzefhxqrrqsw8n4xe",
          "3500": "pri_01j8m8jk2rfa4tz4ybpdhx5xf4",
          "5000": "pri_01j8m8jkgefjt3nvthfzcf9j1b"
        },
        "monthly": {
          "199": "pri_01j8m8jkzc0tcsh1s91s039q7z",
          "299": "pri_01j8m8jmcgjqgww3jztpzh40ct",
          "399": "pri_01j8m8jmstn3c524xrbxga3hhm",
          "499": "pri_01j8m8jn9qkm43r0ea5vvx5crv",
          "999": "pri_01j8m8jns5dr8akhm3fe4ja1ws"
        },
        "yearly": {
          "1000": "pri_01j8m8jp6bq469jdp2v9kvjwe2",
          "1500": "pri_01j8m8jq09g8ppthhbf79gvta2",
          "2000": "pri_01j8m8jqfsspn4h0jra7ed9mrd",
          "3500": "pri_01j8m8jqzh34wgfapndbcnez6a",
          "5000": "pri_01j8m8jrczfa68s2dn0360mp6c"
        }
      },
      "AUD": {
        "once": {
          "1000": "pri_01j8m8jrw6ara5263txg86k7j7",
          "1500": "pri_01j8m8js8vgv8v16dv6qm8c7kc",
          "2000": "pri_01j8m8jsm464zsbjdebb4cp7mw",
          "3500": "pri_01j8m8jszg67mfets934yt1gbf",
          "5000": "pri_01j8m8jtbz5seq8vqzcshshcxy"
        },
        "monthly": {
          "199": "pri_01j8m8jtzeq9kc9qht5evfey81",
          "299": "pri_01j8m8jvc85thk0kygxgszt9sw",
          "399": "pri_01j8m8jvsh09chbmt3ya212xr9",
          "499": "pri_01j8m8jw5ztssr532rt6r5r90a",
          "999": "pri_01j8m8jwjqwha6gzds4g225e13"
        },
        "yearly": {
          "1000": "pri_01j8m8jwz4a5z890xeftzc19xf",
          "1500": "pri_01j8m8jxavw5zfxen759fdnkn7",
          "2000": "pri_01j8m8jxq8wrhvjd891exnbyrt",
          "3500": "pri_01j8m8jy3hvn19305tjkwqqwgc",
          "5000": "pri_01j8m8jyk7cst5e8ttdcrsr0x2"
        }
      },
      "CAD": {
        "once": {
          "1000": "pri_01j8m8jz9etw63asxr9mwmzps3",
          "1500": "pri_01j8m8jznhbspj02sgexbjtsvd",
          "2000": "pri_01j8m8k01fqvbewxa9fx6vmgb0",
          "3500": "pri_01j8m8k0ck51fq0y9whweyqv4a",
          "5000": "pri_01j8m8k0r4gqjasb0r1qmdwwcf"
        },
        "monthly": {
          "199": "pri_01j8m8k13tpwb8229fdke7n5mf",
          "299": "pri_01j8m8k1ffwd47pyx8vm170wb8",
          "399": "pri_01j8m8k1tj3r0m53cjwz86bkss",
          "499": "pri_01j8m8k265d6a97tskhn95hpq8",
          "999": "pri_01j8m8k2jp2xqz5xeyng9291sw"
        },
        "yearly": {
          "1000": "pri_01j8m8k2ymr315bv3vbgdthpga",
          "1500": "pri_01j8m8k3k2p1ftez3c1fx88k6p",
          "2000": "pri_01j8m8k42p1gyfx7dsbanc255q",
          "3500": "pri_01j8m8k4g7r4yy9xdsqdh9363f",
          "5000": "pri_01j8m8k4vfnjak9hg91hqtp85h"
        }
      },
      "EUR": {
        "once": {
          "1000": "pri_01j8m8k59xjpvc6gaqgztc68xc",
          "1500": "pri_01j8m8k5snrz9y1x218hgkmz61",
          "2000": "pri_01j8m8k65sp6289z71ttrr8t33",
          "3500": "pri_01j8m8k6k3mf9cddxa7m0vdh06",
          "5000": "pri_01j8m8k74ayz2sac1pgqx9cg61"
        },
        "monthly": {
          "199": "pri_01j8m8k7jmrjc6mc0cfjhjddfj",
          "299": "pri_01j8m8k7zqj5vvp1hx4p27jrc7",
          "399": "pri_01j8m8k8hth7je2f5kghp4q7w0",
          "499": "pri_01j8m8k912ayw0c2a3khr520mz",
          "999": "pri_01j8m8k9k19kejffw0c1btex4t"
        },
        "yearly": {
          "1000": "pri_01j8m8ka3dw0jw4n60j1f4mg64",
          "1500": "pri_01j8m8kakq2f9zaxt3rxjmxd2m",
          "2000": "pri_01j8m8kb216mnnmjtyrbh49c46",
          "3500": "pri_01j8m8kbffs67z66k8042j5ttx",
          "5000": "pri_01j8m8kbw1pvjpz6nvc7n8xxb3"
        }
      },
      "GBP": {
        "once": {
          "1000": "pri_01j8m8kc91csqgnrft7p8y4kg3",
          "1500": "pri_01j8m8kcp7s44cjgp1e1ha2c6z",
          "2000": "pri_01j8m8kd1q9pt1fg7wp7s7ame4",
          "3500": "pri_01j8m8kdsrs8b3p2jn62h24t94",
          "5000": "pri_01j8m8ke5ga6apgc7stwnnts9w"
        },
        "monthly": {
          "199": "pri_01j8m8ketp7thr2evet66pqw2q",
          "299": "pri_01j8m8kfcdbxv854rw6djmf0yt",
          "399": "pri_01j8m8kfr9107ca1fbpzfyby8g",
          "499": "pri_01j8m8kg4rcbwz1ssmkaj2r850",
          "999": "pri_01j8m8kghvwexpyz0hsjbjwd6q"
        },
        "yearly": {
          "1000": "pri_01j8m8kgyrg4qgt7424cbtz89v",
          "1500": "pri_01j8m8khbd35dd81ht1er72n9y",
          "2000": "pri_01j8m8kht1rtybq7defqsk18k8",
          "3500": "pri_01j8m8kj5znpkhn56qpabbh1x6",
          "5000": "pri_01j8m8kjhtqad01fjwn7pev51k"
        }
      },
      "JPY": {
        "once": {
          "1500": "pri_01j8m8kkcfb7f17cf145w9vn73",
          "2000": "pri_01j8m8kks6dxwc3wxm454fnq4p",
          "2500": "pri_01j8m8km5fn873tsbjdq9gpz86",
          "3500": "pri_01j8m8kmjsze3k173br5nyx6t9",
          "5000": "pri_01j8m8kmzgfw6v8nby8htrba14"
        },
        "monthly": {
          "200": "pri_01j8m8knb68nh6ap9myqhe1mpm",
          "300": "pri_01j8m8knsyxcvyesah7456yh6k",
          "500": "pri_01j8m8kp93cnpd4gmr53yymjrs",
          "1000": "pri_01j8m8kpnw9qth3ff22xjzenrq",
          "1500": "pri_01j8m8kq2n72bffkn64nccc2r7"
        },
        "yearly": {
          "1500": "pri_01j8m8kqfmk7dz6n6kjam1nq3w",
          "2000": "pri_01j8m8kr08ak2g311pp72zkht4",
          "2500": "pri_01j8m8krbv2b33v85837073y09",
          "3500": "pri_01j8m8krqqwbehkzc82jrngwak",
          "5000": "pri_01j8m8ks3exg3569a0bngtdtap"
        }
      },
      "NZD": {
        "once": {
          "1000": "pri_01j8m8ksptym50pft769jnjc32",
          "1500": "pri_01j8m8kt3mq0cahpss74f8mm4t",
          "2000": "pri_01j8m8ktfv3wkeg9e8dq40yqyw",
          "3500": "pri_01j8m8ktv9wpyhp9ywndg12fsm",
          "5000": "pri_01j8m8kv772wp2h065btpwxsk0"
        },
        "monthly": {
          "199": "pri_01j8m8kvkwtqet0wcks1ex1vkd",
          "299": "pri_01j8m8kvzyvtdmamy3jx4mmt3f",
          "399": "pri_01j8m8kwdetyq8kzjgqntn97qj",
          "499": "pri_01j8m8kwwrkzx7sp6m0qy1meq7",
          "999": "pri_01j8m8kx9ka9zbqew4svhqtyzd"
        },
        "yearly": {
          "1000": "pri_01j8m8kxpbm12ey5sb5tgrex5e",
          "1500": "pri_01j8m8ky7pf73aj1ehm1qbep6m",
          "2000": "pri_01j8m8kys4we8cv7eg2m7s4dxv",
          "3500": "pri_01j8m8kz9hm8s6hnwpa38z3316",
          "5000": "pri_01j8m8kzsm4t76q6dq017q7sa3"
        }
      },
      "CHF": {
        "once": {
          "1000": "pri_01j8m8m06bbaqza9snd3b5dak8",
          "1500": "pri_01j8m8m0sftr09mz56ez123zj9",
          "2000": "pri_01j8m8m1cm5gn3hm0hcfe17f5f",
          "3500": "pri_01j8m8m1xep0bt7fr4rn60ggq0",
          "5000": "pri_01j8m8m2c5wmseb3e4x0my9re7"
        },
        "monthly": {
          "199": "pri_01j8m8m2w6hb3489azg13r8snc",
          "299": "pri_01j8m8m397a4vm289bhbxaezh7",
          "399": "pri_01j8m8m3p1zq9r88s150ses3dw",
          "499": "pri_01j8m8m431p95mb30ynnx3cfpk",
          "999": "pri_01j8m8m4frz7hwhr9aj4yf68wj"
        },
        "yearly": {
          "1000": "pri_01j8m8m4zefbjbvg142pxwkw0p",
          "1500": "pri_01j8m8m5c5mxhhcz4qmfatgfx8",
          "2000": "pri_01j8m8m5rywdmyaqyzfy00hff7",
          "3500": "pri_01j8m8m65pxcyk422tp3tw645c",
          "5000": "pri_01j8m8m6jg7fav9sbrj89qc8bb"
        }
      },
      "RUB": {
        "once": {
          "25000": "pri_01j8m8m6ztt5pc1hd5p8xe699v",
          "50000": "pri_01j8m8m7bhnfbtpe7mnybwapab",
          "100000": "pri_01j8m8m7s1wq2e0ahbwm7dj4np",
          "250000": "pri_01j8m8m85hq0k0b47th2yan35v",
          "500000": "pri_01j8m8m8pk27s0wjt660esdkps"
        },
        "monthly": {
          "15000": "pri_01j8m8m95hthn7wpertdqanqrz",
          "25000": "pri_01j8m8m9k08xh12ckn2p5zqdx2",
          "40000": "pri_01j8m8m9zgv9f0nrbjm7pyzac2",
          "50000": "pri_01j8m8maca5qk64bvaaynzyepy",
          "100000": "pri_01j8m8mas1m9se03fvdrwd5jyj"
        },
        "yearly": {
          "25000": "pri_01j8m8mb8w60v21qmx8dfj4xah",
          "50000": "pri_01j8m8mbnrc1tzr32729esh1za",
          "100000": "pri_01j8m8mc2zq0w6hvscsvnaknpp",
          "250000": "pri_01j8m8mcf8qp6v5wq4gzbc9c2p",
          "500000": "pri_01j8m8mczr285ebrjdawbtab01"
        }
      },
      "PLN": {
        "once": {
          "3999": "pri_01j8m8mdccjrz00pvfchhgmngs",
          "5999": "pri_01j8m8mdzne4h2d90gsry52src",
          "7999": "pri_01j8m8mec7r6qykayf4hxwx6pw",
          "13999": "pri_01j8m8mes9pcz7pw5na9gmc77b",
          "19999": "pri_01j8m8mf5x6bk8pg24bjn58a26"
        },
        "monthly": {
          "799": "pri_01j8m8mfjdtvzqtecd62wa8vav",
          "1199": "pri_01j8m8mg293a04ne3ch0yr0k1g",
          "1599": "pri_01j8m8mgfb6te5g568gh861r4h",
          "1999": "pri_01j8m8mgwq7z9h9qaw6f7qzmd2",
          "3999": "pri_01j8m8mh92nn13hm2mrypsx97n"
        },
        "yearly": {
          "3999": "pri_01j8m8mhp2c8fz8czsahv89s05",
          "5999": "pri_01j8m8mj2t4r5hp2nfecmdh6fk",
          "7999": "pri_01j8m8mjff9xkdfq3j6s7sfqya",
          "13999": "pri_01j8m8mk03qbswqk0f9q0vffha",
          "19999": "pri_01j8m8mkbgc35nm8bhtx8x6ah0"
        }
      }
    }
  },
  live: {
    "premium": {
      "USD": {
        "monthly": {
          "400": "pri_01j8m8wnk5q7jy2knjwjq47ymh"
        },
        "yearly": {
          "4000": "pri_01j8m8wp686vs2hz8bgz2q2jys"
        }
      },
      "EUR": {
        "monthly": {
          "400": "pri_01j8m8wpmve955d1azhz0cbzf6"
        },
        "yearly": {
          "4000": "pri_01j8m8wq0h4m6mjxhx6hm1629b"
        }
      },
      "CAD": {
        "monthly": {
          "400": "pri_01j8m8wqbvd57bp3h8jk9vv6ay"
        },
        "yearly": {
          "4000": "pri_01j8m8wqrabsr8bbjksf1hfkbn"
        }
      },
      "GBP": {
        "monthly": {
          "400": "pri_01j8m8wr4grtx8f2rv3nzvj0dz"
        },
        "yearly": {
          "4000": "pri_01j8m8wrgxpqjkk4dqps0h0961"
        }
      },
      "AUD": {
        "monthly": {
          "400": "pri_01j8m8wrxpzdrgnabqd2sacgy6"
        },
        "yearly": {
          "4000": "pri_01j8m8wsbtvmrk9zztcf12a2hw"
        }
      },
      "NZD": {
        "monthly": {
          "400": "pri_01j8m8wstvvrrtrza2j3dzfnza"
        },
        "yearly": {
          "4000": "pri_01j8m8wt94wywyjhcdff831fg5"
        }
      },
      "CHF": {
        "monthly": {
          "400": "pri_01j8m8wtq5vqhxzcwt8xq4ka0v"
        },
        "yearly": {
          "4000": "pri_01j8m8wv3m0xj68saq0ehhjgyt"
        }
      },
      "PLN": {
        "monthly": {
          "1499": "pri_01j8m8wvkmfvr8151rfvypch7h"
        },
        "yearly": {
          "14999": "pri_01j8m8ww2nyhn7fr6ja6ytrfmq"
        }
      },
      "JPY": {
        "monthly": {
          "600": "pri_01j8m8wwjf6nx7pmk54akexpbr"
        },
        "yearly": {
          "6000": "pri_01j8m8wwxsqh8qnpy83be4b7z6"
        }
      },
      "RUB": {
        "monthly": {
          "35000": "pri_01j8m8wxa0k5bbm1whn1v1zd6n"
        },
        "yearly": {
          "350000": "pri_01j8m8wxnnab1n8v9es23mgshk"
        }
      }
    },
    "contribution": {
      "USD": {
        "once": {
          "1000": "pri_01j8m8wyk4pg9s9xjk5ezgm00p",
          "1500": "pri_01j8m8wyzs4a8cd8163w0s07jp",
          "2000": "pri_01j8m8wzbmnkfd4jhq7g3g8k9r",
          "3500": "pri_01j8m8wzs66vh79w4v0128bj44",
          "5000": "pri_01j8m8x05zdfexnc5v5xwj73fp"
        },
        "monthly": {
          "199": "pri_01j8m8x0jgvfzdkt36cqqh7axn",
          "299": "pri_01j8m8x0znzdkmrzz8ajrnt03z",
          "399": "pri_01j8m8x1cg4sva4qvb5a2p7vwv",
          "499": "pri_01j8m8x1s6nhkyh4tdrpjthm2b",
          "999": "pri_01j8m8x25zxk74w2nctstbgm7q"
        },
        "yearly": {
          "1000": "pri_01j8m8x2rbnkg7ezc21q08a0dk",
          "1500": "pri_01j8m8x33qqwfbfmbrxdehthv0",
          "2000": "pri_01j8m8x3fkprsr0an27d0g1k51",
          "3500": "pri_01j8m8x3vpw7yfr9g242c26303",
          "5000": "pri_01j8m8x47vwpk08wz3ga0qh2sc"
        }
      },
      "AUD": {
        "once": {
          "1000": "pri_01j8m8x4k0a5bdkzqdwd7qvkv3",
          "1500": "pri_01j8m8x4yj5nn8hxh2hjt574wb",
          "2000": "pri_01j8m8x5avm1zbwzrv7x6818rf",
          "3500": "pri_01j8m8x5pf41jrapfbxq1ktkah",
          "5000": "pri_01j8m8x62g5ky87dnb3eh7fefv"
        },
        "monthly": {
          "199": "pri_01j8m8x6ep82pr8gxhszdg87w2",
          "299": "pri_01j8m8x6tfbe14j97mw9tx8sa0",
          "399": "pri_01j8m8x77f1z0g6yrqrs1p5cjh",
          "499": "pri_01j8m8x7k5sbsa6eswy6c277d4",
          "999": "pri_01j8m8x7zdn15qwsn3rvdg2w3k"
        },
        "yearly": {
          "1000": "pri_01j8m8x8av4bhv1x99db65y0rd",
          "1500": "pri_01j8m8x8p2w6cgmxffrxw9e7fk",
          "2000": "pri_01j8m8x916q076gnftrpet7ntv",
          "3500": "pri_01j8m8x9jvfc8ghgfsmm8176y2",
          "5000": "pri_01j8m8xa5ywfszrt24q3ksvyec"
        }
      },
      "CAD": {
        "once": {
          "1000": "pri_01j8m8xahd932zqxf3q9rhb8k6",
          "1500": "pri_01j8m8xayzdy80enqdmss92a72",
          "2000": "pri_01j8m8xbb3ykp0w7wmkcnq5n19",
          "3500": "pri_01j8m8xbqca2p5fwae4zemrpz6",
          "5000": "pri_01j8m8xc5a6daatba8j028xxt7"
        },
        "monthly": {
          "199": "pri_01j8m8xchcp1e95xj8at1r1phj",
          "299": "pri_01j8m8xcz8ewak7kqp17wvscza",
          "399": "pri_01j8m8xdar8e72xz9kg4rcnsyt",
          "499": "pri_01j8m8xdr5gz1hz72jjrkbhbdd",
          "999": "pri_01j8m8xeadh6ysjyxc1nrfwfj4"
        },
        "yearly": {
          "1000": "pri_01j8m8xep555z2kadcqj82crqa",
          "1500": "pri_01j8m8xf1qqxngsdwrjabf9nz7",
          "2000": "pri_01j8m8xfd5bepxj1z5vvw6f71b",
          "3500": "pri_01j8m8xfs2njqa7b3x5hzwz5k2",
          "5000": "pri_01j8m8xg8xzya7b2sfjwmp209q"
        }
      },
      "EUR": {
        "once": {
          "1000": "pri_01j8m8xgnjwhm80jpb6y1m5884",
          "1500": "pri_01j8m8xh2qbe4qhtmgvvb9k82h",
          "2000": "pri_01j8m8xhg4g1p0zwzsfpqpnfep",
          "3500": "pri_01j8m8xhzjje1xd20dfm3mdrwm",
          "5000": "pri_01j8m8xjch0kagmzhfmzt7nnk5"
        },
        "monthly": {
          "199": "pri_01j8m8xjstr70njzscpqnpghve",
          "299": "pri_01j8m8xk6cx7qzb6rvj4qgw0qy",
          "399": "pri_01j8m8xkk94k0dc5dmyxp9vg74",
          "499": "pri_01j8m8xkzdjhdzsqycj0zaxv6q",
          "999": "pri_01j8m8xmdchnv1bxjbp8z0jn1n"
        },
        "yearly": {
          "1000": "pri_01j8m8xmxbb9y560kqhv7v3grc",
          "1500": "pri_01j8m8xnb8npvmg6hr47r72asd",
          "2000": "pri_01j8m8xnsp5qzmrjdedkeb6nhc",
          "3500": "pri_01j8m8xp9crbt67pzf67gxcyn0",
          "5000": "pri_01j8m8xpn8rsmmz1jk6ftbv4gq"
        }
      },
      "GBP": {
        "once": {
          "1000": "pri_01j8m8xq38dg7kpr9svxdeyzhr",
          "1500": "pri_01j8m8xqfpaj34effhh36q45hj",
          "2000": "pri_01j8m8xqw2jk92fww0qvw82ca4",
          "3500": "pri_01j8m8xr9s3mzs4dx0z7f7zmvz",
          "5000": "pri_01j8m8xrra4pxt0q70s036gek6"
        },
        "monthly": {
          "199": "pri_01j8m8xs6zn2wrtkxj8anvpyh2",
          "299": "pri_01j8m8xsm2bxm6s346bnzk4r3p",
          "399": "pri_01j8m8xszw3jvp4wtn2rc6tvxq",
          "499": "pri_01j8m8xtb3kknb2p2x8fhp0bs7",
          "999": "pri_01j8m8xtp7wj00v80cmmpnj6ez"
        },
        "yearly": {
          "1000": "pri_01j8m8xv1z2nn78vek2j4xbdv7",
          "1500": "pri_01j8m8xvef8vt4grnwdqs1e964",
          "2000": "pri_01j8m8xvsmwdba0b2c6z868p4s",
          "3500": "pri_01j8m8xw5ngnsjz23nme7h577b",
          "5000": "pri_01j8m8xwh5r1n3k6qrefk1jr4a"
        }
      },
      "JPY": {
        "once": {
          "1500": "pri_01j8m8xwwx2hv460pfycam8x3e",
          "2000": "pri_01j8m8xx8bdx1d12jeyp0ebkhv",
          "2500": "pri_01j8m8xxkywdhvjm64yx3ynxkm",
          "3500": "pri_01j8m8xxzmcw6hs09qf35wwzmy",
          "5000": "pri_01j8m8xygvn47qgp4t1x0c22fr"
        },
        "monthly": {
          "200": "pri_01j8m8xyw8yy7yaqddzgpztfvj",
          "300": "pri_01j8m8xz8dqs9jb8b6fbhqzqxt",
          "500": "pri_01j8m8xzm1mk4yps1m4s0cpjvt",
          "1000": "pri_01j8m8xzz9v4bg2y19764j0n72",
          "1500": "pri_01j8m8y0ad02t4fq9am3j0ntdk"
        },
        "yearly": {
          "1500": "pri_01j8m8y0p2gr4qb10yhr6qwt3b",
          "2000": "pri_01j8m8y117cfm9pjh34fstpkpj",
          "2500": "pri_01j8m8y1ccrs2hx4aeyzwx6v3y",
          "3500": "pri_01j8m8y1yby88f1hxg0p9r34fr",
          "5000": "pri_01j8m8y2ah6fwmddmwvyrpj20w"
        }
      },
      "NZD": {
        "once": {
          "1000": "pri_01j8m8y2p0m9few61hhpsz9mnz",
          "1500": "pri_01j8m8y32x4bpj7xrd0jt0c4zm",
          "2000": "pri_01j8m8y3extqkrqx1krtxhzqd8",
          "3500": "pri_01j8m8y3x26rwepzrjww7a2c3f",
          "5000": "pri_01j8m8y49qfj2dw3zyjb4r0ht6"
        },
        "monthly": {
          "199": "pri_01j8m8y4mz9v8ss9ff63k9xrfh",
          "299": "pri_01j8m8y539nhq8dcxnrjkgjqw3",
          "399": "pri_01j8m8y5fn2bf8295vwwd4awh7",
          "499": "pri_01j8m900nfpm6bq98hz339hptb",
          "999": "pri_01j8m9012py83p30a3yet6326h"
        },
        "yearly": {
          "1000": "pri_01j8m901k3fhby0t9a1hhwprbc",
          "1500": "pri_01j8m9022kcnh96m94m6ec7reg",
          "2000": "pri_01j8m902fqwav3ze9zkaq3b04v",
          "3500": "pri_01j8m90303p4t29xzgzqbhamm7",
          "5000": "pri_01j8m903ftbhwk60w0d1n4h696"
        }
      },
      "CHF": {
        "once": {
          "1000": "pri_01j8m903xmt8ye63xjnptx71t2",
          "1500": "pri_01j8m9049dfpbxdkghtg21ha88",
          "2000": "pri_01j8m904pjast5eayrwv4qesnt",
          "3500": "pri_01j8m9052yfptvmy2repfdvbyx",
          "5000": "pri_01j8m905ftbq0qzerpdy7favy1"
        },
        "monthly": {
          "199": "pri_01j8m90663zk10x2qgc8kgph62",
          "299": "pri_01j8m906jzktf2zm2f0ns3d6nr",
          "399": "pri_01j8m906znk0tfm6vq1cpryjfm",
          "499": "pri_01j8m907b40fm9q4krqmtrbeqx",
          "999": "pri_01j8m907pj9za9egsf5sy5rqp4"
        },
        "yearly": {
          "1000": "pri_01j8m9082bz8rdejrqpnkpxypj",
          "1500": "pri_01j8m908e4ecx4ad4f231c8gbe",
          "2000": "pri_01j8m908sj1gwsbw98tav9v8a1",
          "3500": "pri_01j8m9095f913yb04a4f1jypbn",
          "5000": "pri_01j8m909ht3wgp05yd4hwy8mzf"
        }
      },
      "RUB": {
        "once": {
          "25000": "pri_01j8m909xcmzm9bd1hcspr2rmv",
          "50000": "pri_01j8m90a8rjrjyyptpnapaah3n",
          "100000": "pri_01j8m90aksak0hakwreszxdrnr",
          "250000": "pri_01j8m90ayp0xfe61jvsq5c2jee",
          "500000": "pri_01j8m90b9sqdrs6yj38htshzff"
        },
        "monthly": {
          "15000": "pri_01j8m90bp5pzjkgcm9604ds0z1",
          "25000": "pri_01j8m90c18yjg11qr157f8d06w",
          "40000": "pri_01j8m90ccky7p1kj9wbzc3jggj",
          "50000": "pri_01j8m90cr9sy5qrgqzpea3hqy3",
          "100000": "pri_01j8m90d3er3hc6vjn3chj4s0y"
        },
        "yearly": {
          "25000": "pri_01j8m90deeq4897hrq63v8z321",
          "50000": "pri_01j8m90dsyk5zg2e6x1f9m0wjp",
          "100000": "pri_01j8m90e6116j8sn4n3w8y8hpw",
          "250000": "pri_01j8m90egygatqay009j7jftmg",
          "500000": "pri_01j8m90f079h8px01rkxqbzxj6"
        }
      },
      "PLN": {
        "once": {
          "3999": "pri_01j8m90fdkm838w7g08a3k52bd",
          "5999": "pri_01j8m90fs1gqfrrtev89z1e9xw",
          "7999": "pri_01j8m90g5mpx49bswg880nvmqn",
          "13999": "pri_01j8m90gjsdkbrqe989x4bk569",
          "19999": "pri_01j8m90gz0wg980qzq9ke72fhg"
        },
        "monthly": {
          "799": "pri_01j8m90hcqqcmsk3x5q2vk3smr",
          "1199": "pri_01j8m90hsaax89bm22ftnkgb41",
          "1599": "pri_01j8m90j9t3pya8scr7rv6nsm6",
          "1999": "pri_01j8m90jp079bv78rc5f15hk0f",
          "3999": "pri_01j8m90k6c7c6zrjd0v9b61ck0"
        },
        "yearly": {
          "3999": "pri_01j8m90kra644619yw7jdnew5d",
          "5999": "pri_01j8m90m5y40pbvwkjs9w4swma",
          "7999": "pri_01j8m90mk754xnzjv6dbnw5r2w",
          "13999": "pri_01j8m90mzjw6gb1vhzqfkhmzft",
          "19999": "pri_01j8m90nbnwfe04regwtdnn93c"
        }
      }
    }
  }
};

const PADDLE_EXPERIMENT_PRICES = {
  test: {
    "contribution": {
      "USD": {
        "once": {
          "500": "pri_01j8m97vgafws00sa6dbsvzwn4",
          "2500": "pri_01j8m97w0y731qppxy6krqmw50"
        }
      },
      "CAD": {
        "once": {
          "500": "pri_01j8m97wk5kfaj36jxw9d04021",
          "2500": "pri_01j8m97wzcch0e0j16tbcpcfxr"
        }
      },
      "AUD": {
        "once": {
          "500": "pri_01j8m97xc1xw71m764rfrdw42d",
          "2500": "pri_01j8m97xr9bhxznmt4kppjgkkv"
        }
      }
    },
    "premium": {
      "USD": {
        "monthly": {
          "100": "pri_01j8m97ykayyhgthg4xpf0dm6t",
          "200": "pri_01j8m97z0a776dgy8h8pakqseh",
          "300": "pri_01j8m97zdwgdkn9p3kzptrkrhw",
          "500": "pri_01j8m97ztnv0rwk8e8adaph1p4",
          "600": "pri_01j8m980fr6cp774p431ssfmca",
          "700": "pri_01j8m980x1zaxdfwmyhejypfta",
          "800": "pri_01j8m981fy7p9ttzh141vmz946",
          "900": "pri_01j8m981wsg69v4f043vzcp7r9",
          "1000": "pri_01j8m982fffcff0pe6my7jjwfs"
        },
        "yearly": {
          "1000": "pri_01j8m982ve3xdzkp42sqke5g4n",
          "2000": "pri_01j8m9839ax2z9ar3t6nk7fwkp",
          "3000": "pri_01j8m983pme1qjk189t43am94k",
          "5000": "pri_01j8m98467svfg84d0g4nr979z",
          "6000": "pri_01j8m984kpvp1j7wd5g51cs5s1",
          "7000": "pri_01j8m9852zx8y2rwvxy66s5wez",
          "8000": "pri_01j8m985gh073qkqckmk4fs6jq",
          "9000": "pri_01j8m985z2ebew6bj58v5mznj5",
          "10000": "pri_01j8m986ad13q7qnvpvk60y8x3"
        }
      },
      "CAD": {
        "monthly": {
          "100": "pri_01j8m986tm4dpaksnrsppwvrep",
          "200": "pri_01j8m9879gek4qheegwwm2eha2",
          "300": "pri_01j8m987pc8gf2jftmj5y7japp",
          "500": "pri_01j8m98863gxe8v7f8wse28kg7",
          "600": "pri_01j8m988hx82fkqqx1fv8hj49q",
          "700": "pri_01j8m988zfqvmk6yjtde9fgp7n",
          "800": "pri_01j8m989cwmf3sy09gshrpmxdy",
          "900": "pri_01j8m989wrcc9g7qb82a6kdqms",
          "1000": "pri_01j8m98aa2ect5xzpd4shc8ggb"
        },
        "yearly": {
          "1000": "pri_01j8m98atcs21v5xngjn9bch9w",
          "2000": "pri_01j8m98bch4ptgd1xnjb2zyq0v",
          "3000": "pri_01j8m98bw8s61xe9y4ybdk0mdp",
          "5000": "pri_01j8m98c9exyprbh2t5879qyg9",
          "6000": "pri_01j8m98csm3aw0a1gn941jfcp1",
          "7000": "pri_01j8m98d6e9hr78jeqcdcqxnbg",
          "8000": "pri_01j8m98dk4rdrw0jgad0vwwwg5",
          "9000": "pri_01j8m98dzh3avhjdb6rzvtjxey",
          "10000": "pri_01j8m98ecy9pg2w8tpv7ncwd9v"
        }
      },
      "AUD": {
        "monthly": {
          "100": "pri_01j8m98ewmc1yqm565k2rj4k0m",
          "200": "pri_01j8m98f8v30hkev9hdtan9y9k",
          "300": "pri_01j8m98fpb7c8r4zg0s7bt9hxg",
          "500": "pri_01j8m98g30ny54gbfn8nvfbkxf",
          "600": "pri_01j8m98gk13qezss99ejsq09h5",
          "700": "pri_01j8m98h0641gbq47nek58w059",
          "800": "pri_01j8m98hcevnxwf0tedr7kqvtp",
          "900": "pri_01j8m98hs4edh55e38v10g29dt",
          "1000": "pri_01j8m98j45475q3kskz375cdc4"
        },
        "yearly": {
          "1000": "pri_01j8m98jg79nbq1mkyhphxjhbk",
          "2000": "pri_01j8m98jwf7cv4405847fgap2e",
          "3000": "pri_01j8m98k8c6e506aw4cw83z520",
          "5000": "pri_01j8m98knnfyb9k06jjx7pwp7j",
          "6000": "pri_01j8m98m0zbgtssqpkqfdac3ed",
          "7000": "pri_01j8m98mc0spdfny5x3jfyn5ay",
          "8000": "pri_01j8m98mr3zawsjq9qv4awvy4y",
          "9000": "pri_01j8m98n3mtepjb85r5j4mz1ay",
          "10000": "pri_01j8m98ng03csz5118jhhg97br"
        }
      }
    }
  },
  live: {
    "contribution": {
      "USD": {
        "once": {
          "500": "pri_01j8m9ahfjj5cahq6pbx3p5kxv",
          "2500": "pri_01j8m9ahx7e3qgw3smw8n0rycg"
        }
      },
      "CAD": {
        "once": {
          "500": "pri_01j8m9ajb8p9ym9xxx3yrxsfbt",
          "2500": "pri_01j8m9ajtbexdk001117qbndf4"
        }
      },
      "AUD": {
        "once": {
          "500": "pri_01j8m9ak9q4k205dcx6cjt15p3",
          "2500": "pri_01j8m9aks311w3tsjrw3swymmz"
        }
      }
    },
    "premium": {
      "USD": {
        "monthly": {
          "100": "pri_01j8m9amzztkr724pcbnavaysh",
          "200": "pri_01j8m9ancwtayfg3g2nzfyecnk",
          "300": "pri_01j8m9anwby89ft9qt0tdnpxnd",
          "500": "pri_01j8m9ap914cf8d2a1f9xef33z",
          "600": "pri_01j8m9apn6had8ancfxvz1sr3r",
          "700": "pri_01j8m9aq1ehx9rvdpsgyf81s26",
          "800": "pri_01j8m9aqebsgx70fynzzs5wkbf",
          "900": "pri_01j8m9aqtysqt086ntwxhk2m7m",
          "1000": "pri_01j8m9ar6t5msy0bm81v5fr9tv"
        },
        "yearly": {
          "1000": "pri_01j8m9arjx6scqj2eayer9ejkj",
          "2000": "pri_01j8m9arz4h9kpcyskgg65xvwy",
          "3000": "pri_01j8m9asba04d8d8tc31x87b2h",
          "5000": "pri_01j8m9asrtc6mxzww1zhrcm072",
          "6000": "pri_01j8m9at5b12g812fwyj8swyed",
          "7000": "pri_01j8m9atgp0hhg0zhbdy1qk6xm",
          "8000": "pri_01j8m9atx0b90p3tbh2jpjg2hn",
          "9000": "pri_01j8m9av8paat0rx520kemnmz8",
          "10000": "pri_01j8m9avn583nkj0b4d3pvaz8f"
        }
      },
      "CAD": {
        "monthly": {
          "100": "pri_01j8m9aw18rg3531bf04zzh47a",
          "200": "pri_01j8m9awdyewa3h1pydyhc7pd4",
          "300": "pri_01j8m9awtt2j1hs9fas2nxm8jw",
          "500": "pri_01j8m9ax71rz503vc29p33jy9c",
          "600": "pri_01j8m9axkcr8nawf7ga822x1za",
          "700": "pri_01j8m9ay0hznkp4tf0fteq56cv",
          "800": "pri_01j8m9aype0pq81sgsr5nmae43",
          "900": "pri_01j8m9az3s9v5p5rhw7a6chgx3",
          "1000": "pri_01j8m9azjq7t712nwphhbr2hrb"
        },
        "yearly": {
          "1000": "pri_01j8m9azzsqgv763qjmrgtn61w",
          "2000": "pri_01j8m9b0f3ccyjxfkstb4tc341",
          "3000": "pri_01j8m9b0vph6gfzxqphqq3f1t5",
          "5000": "pri_01j8m9b18xtf0djqxv3dtbzww8",
          "6000": "pri_01j8m9b1nd9wn3vdr932x6smd0",
          "7000": "pri_01j8m9b21prr3anwjfyfn5cspf",
          "8000": "pri_01j8m9b2ehs0mn36wnsva9xvac",
          "9000": "pri_01j8m9b30qgzc14gjwj05pfrvv",
          "10000": "pri_01j8m9b3d7g3nnpx9qc000nfq8"
        }
      },
      "AUD": {
        "monthly": {
          "100": "pri_01j8m9b3ss9dhnwhr4dm2dxksj",
          "200": "pri_01j8m9b499qaf1434ezdks9hgq",
          "300": "pri_01j8m9b4ngcz8gkjd8pmhnbn9y",
          "500": "pri_01j8m9b595p7yz5605shjht26z",
          "600": "pri_01j8m9b5vy5abphmr46mz6q8cf",
          "700": "pri_01j8m9b6fjr3d1xhp93n3x4nnz",
          "800": "pri_01j8m9b6wkrxb97v4666pe73c8",
          "900": "pri_01j8m9b79cfgzwh6cth96nke46",
          "1000": "pri_01j8m9b7nzmkkgj6w59sfg6paz"
        },
        "yearly": {
          "1000": "pri_01j8m9b82gazwkajy3jd5m9t4g",
          "2000": "pri_01j8m9b8ntpm49r87hnsf3f7zz",
          "3000": "pri_01j8m9b92e76a51r9f2fr8b6ps",
          "5000": "pri_01j8m9b9ee9ehhcc1cb78jnmwd",
          "6000": "pri_01j8m9b9tfzdk8e094b310eydz",
          "7000": "pri_01j8m9ba6ft9m9dpcp9vakk786",
          "8000": "pri_01j8m9bahz0kbbq0k1fds533nv",
          "9000": "pri_01j8m9baxpehmqkrmzkq3tgxh2",
          "10000": "pri_01j8m9bb9s9gn7h9c2nks7ch22"
        }
      }
    }
  }
};

const PRODUCT_CONFIG = {
  contribution: {
    code: "",
    successUrl: "https://adblockplus.org/payment-complete",
  },
  premium: {
    code: "ME",
    successUrl: "https://accounts.adblockplus.org/premium",
  },
  vpn: {
    code: "VP",
    successUrl: "https://accounts.adblockplus.org/premium",
  },
  premiumvpn: {
    code: "ME-VP",
    successUrl: "https://accounts.adblockplus.org/premium",
  },
};

// Paddle uses some non-standard locale codes:
const PADDLE_LOCALE_EXCEPTIONS = {
  "zh_CN": "zh-Hans",
  "sv": "da",
  "pt_BR": "pt",
  "ko_KR": "ko",
  "pl_PL": "pl",
  "ca": "en",
  "uk": "en",
};

function generatePremiumId() {
  const datetimestamp = ((Date.now()) % 1e8);
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let sudoRandomChars = "";
  for (let i = 0; i < 8; i++) sudoRandomChars += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  return sudoRandomChars + datetimestamp;
}

function getBrowserCode() {
  const chrome = navigator.userAgent.includes("Chrome");
  const opera = navigator.userAgent.includes("OPR");
  const edg = navigator.userAgent.includes("Edg");
  const edge = navigator.userAgent.includes("Edge");
  const safari = navigator.userAgent.includes("Safari");
  const firefox = navigator.userAgent.includes("Firefox");
  const samsung = navigator.userAgent.includes("Samsung");
  return chrome && !opera && !samsung && !edg && !edge ? "E"
  : safari && !opera && !samsung && !edg && !edge ? "S"
  : firefox ? "F" : opera ? "O" : edge ? "M" : edg ? "CM" : samsung ? "G" : "U";
}

function getOperatingSystemCode() {
  if (typeof navigator.appVersion != "string") return "U";
  return navigator.appVersion.includes("Win") ? "W"
  : navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad") ? "I"
  : navigator.appVersion.includes("Mac") ? "M"
  : navigator.appVersion.includes("X11") || navigator.appVersion.includes("Linux") ? "L"
  : "U";
}

const locale = adblock.settings.locale || "en";
const country = adblock.settings.country || "unknown";
const pageName = adblock.settings.page || "U";
const pageCode = adblock.settings.pageCode || "U";
const funnelCode = adblock.query.get("s") || "";
const premiumId = adblock.settings.premiumId = adblock.settings.premiumId || generatePremiumId();
const browserCode = getBrowserCode();
const operatingSystemCode = getOperatingSystemCode();

let isExperiment = false;
let experimentId, experimentVariantId;
adblock.api.flagExperiment = flag => isExperiment = !!flag;
adblock.api.setExperimentId = id => { experimentId = id; isExperiment = true; }
adblock.api.setExperimentVariantId = variant => { experimentVariantId = variant; isExperiment = true; }

/** Provides reference to Paddle's Checkout events via on/fire API */
export const checkoutEvents = adblock.api.checkoutEvents = new Events();
const paddleEventCallback = event => checkoutEvents.fire(event.name, event.data);

let paddleToken = PADDLE_LIVE_TOKEN;

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

if (paddleEnvironment == "test") {
  paddleToken = PADDLE_TEST_TOKEN;
  Paddle.Environment.set("sandbox");
}

Paddle.Initialize({ token: paddleToken, eventCallback: paddleEventCallback });

// FIXME: We should only use this temporarily to avoid breaking ongoing conversion.com experiments
const planCodeCompatibility = {
  "ME": "premium",
  "VP": "vpn",
  "ME-VP": "premiumvpn",
};

/**
 * Use this function instead of calling Paddle.Checkout.open() yourself to avoid
 * spreading and/or duplicating paddle config, validation, and custom payment
 * data, query parameters, and localstorage buisness logic across pages.
 * @param {Object} options - checkout options
 * @param {string} options.product - product name (e.g. contribution|premium|premiumvpn)
 * @param {string} options.currency - checkout currency (e.g. USD|EUR|GBP)
 * @param {string} options.frequency - checkout frequency (e.g. once|monthly|yearly)
 * @param {string} options.amount - checkout amount in cents (e.g. 1000|199)
 * @param {string} [options.flow] - checkout flow being completed (default: page name)
 * @param {string} [options.successUrl] - checkout success URL redirected to
 */
export const checkout = adblock.api.checkout = function checkout(options) {

  let { product, plan, adblockPlan, currency, frequency, amount, flow, successUrl } = options;

  const clickTs = Date.now();

  flow = flow || pageName;

  // FIXME: We should only use this temporarily to avoid breaking ongoing conversion.com experiments
  product = product || planCodeCompatibility[plan] || planCodeCompatibility[adblockPlan] || plan || adblockPlan;
  if (!PRODUCT_CONFIG.hasOwnProperty(product)) throw new Error("Invalid product");
  const productCode = PRODUCT_CONFIG[product].code;
  if (plan || adblockPlan) console.warn("Please use checkout({product}) instead of checkout({plan|adblockPlan})");

  const priceId = PADDLE_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount]
  || PADDLE_EXPERIMENT_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount];
  if (typeof priceId != "string" || !priceId.length) throw new Error("Invalid price");
  if ((!experimentId || !experimentVariantId) && !PADDLE_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount])
    console.warn("Please use adblock.api.setExperimentId(id) and adblock.api.setExperimentVariantId(id) if running an experiment, else add experimental prices to PADDLE_PRICES on integration");

  successUrl = successUrl || PRODUCT_CONFIG[product].successUrl;
  if (typeof successUrl != "string" || !successUrl.length) throw new Error("Invalid successUrl");

  const successParams = new URLSearchParams();
  successParams.set("premium-checkout__handoff", 1);
  successParams.set("premium-checkout__flow", flow);
  successParams.set("premium-checkout__page", pageName);
  successParams.set("premium-checkout__product", product);
  successParams.set("premium-checkout__premiumId", premiumId);
  successParams.set("premium-checkout__currency", currency);
  successParams.set("premium-checkout__frequency", frequency);
  successParams.set("premium-checkout__amount", amount);
  successParams.set("premium-checkout__country", country);
  successParams.set("premium-checkout__locale", locale);
  successParams.set("premium-checkout__timestamp", clickTs);
  successUrl = `${successUrl}?${successParams.toString()}`;

  try {
    localStorage.setItem("contributionInfo", JSON.stringify({
      clickTs,
      amount,
      frequency,
      currency,
      lang: locale,
      source: pageName,
      processor: "paddle",
    }));
  } catch (error) {
    console.error(error);
  }

  const customData = {
    locale,
    userid: premiumId,
    tracking: `${productCode}_${funnelCode} X0G0 F${browserCode}O${operatingSystemCode}S${pageCode} ${premiumId}`,
    testmode: paddleEnvironment == "test",
    country,
    ga_id: "",
    premium: "false",
    premium_cid: "0",
    premium_sid: "0",
    currency,
    recurring: frequency != "once",
    subType: frequency != "once" ? frequency : "",
    experiment: "",
    experiment_id: "",
    variant: "",
    variant_index: -1,
    amount_cents: amount,
    success_url: successUrl,
    cancel_url: window.location.href
  };

  Paddle.Checkout.open({
    settings: {
      successUrl,
      locale: PADDLE_LOCALE_EXCEPTIONS[locale] || locale,
    },
    customData,
    items: [{ priceId }],
  });

};