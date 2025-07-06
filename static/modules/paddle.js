/* global adblock, Paddle */
// requires scripts/namespace
// requires scripts/events

const PADDLE_LIVE_TOKEN = "live_d10b49fa5fc207ade026db6535c";
const PADDLE_TEST_TOKEN = "test_b0e15dc1f1e4f20b0fe6396e893";

// CAUTION: Add experiment prices to PADDLE_EXPERIMENT_PRICES below instead
const PADDLE_PRICES = {
  test: {
    "premium": {
      "USD": {
        "monthly": {
          "400": {
            "0": "pri_01j8m8j8945gk9mv9hxd3ykmtm"
          }
        },
        "yearly": {
          "4000": {
            "0": "pri_01j8m8j8p25fdrsde138c9n4ef"
          }
        }
      },
      "EUR": {
        "monthly": {
          "350": {
            "0": "pri_01jjktekt8haxwceypyjn42780"
          }
        },
        "yearly": {
          "3500": {
            "0": "pri_01jjkt3y8r8a8jqd6drymfz4d7"
          }
        }
      },
      "CAD": {
        "monthly": {
          "500": {
            "0": "pri_01jjkt7jghfab1bdt5mryhkjwv"
          }
        },
        "yearly": {
          "5000": {
            "0": "pri_01jjkt4vag5qjb1y3nvsq6qd6j"
          }
        }
      },
      "GBP": {
        "monthly": {
          "350": {
            "0": "pri_01jjktdvr9ph8ys5g2e4qc0mwk"
          }
        },
        "yearly": {
          "3500": {
            "0": "pri_01jjkt2qwd20xxhsdxmpej0pf7"
          }
        }
      },
      "AUD": {
        "monthly": {
          "600": {
            "0": "pri_01jjktaq8nj09tfwk49g8aq0hf"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01jjkt6pdw6mr6q6bgr8kdt4dx"
          }
        }
      },
      "NZD": {
        "monthly": {
          "600": {
            "0": "pri_01jjktd0n4cbvky0pt9xvq4qj2"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01jjkt5vvsvhrwe2vdw20m3q8g"
          }
        }
      },
      "CHF": {
        "monthly": {
          "400": {
            "0": "pri_01j8m8jd28d47sn96y0t0x65t4"
          }
        },
        "yearly": {
          "4000": {
            "0": "pri_01j8m8jdemv7xfp2eqm289h2ej"
          }
        }
      },
      "PLN": {
        "monthly": {
          "1499": {
            "0": "pri_01j8m8jdv87a0h5x7c32b0e5hz"
          }
        },
        "yearly": {
          "14999": {
            "0": "pri_01j8m8je7w3jz268d02t046g11"
          }
        }
      },
      "JPY": {
        "monthly": {
          "600": {
            "0": "pri_01j8m8jek6r0f6zptrh9y9ngpb"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01j8m8jf51d1mbd9stgz9956cq"
          }
        }
      },
      "RUB": {
        "monthly": {
          "35000": {
            "0": "pri_01j8m8jfv53fqj7w9w17rz4ceh"
          }
        },
        "yearly": {
          "350000": {
            "0": "pri_01j8m8jgfrcbq9xerszs9a9wt3"
          }
        }
      }
    }
  },
  live: {
    "premium": {
      "USD": {
        "monthly": {
          "400": {
            "0": "pri_01j8m8wnk5q7jy2knjwjq47ymh"
          }
        },
        "yearly": {
          "4000": {
            "0": "pri_01j8m8wp686vs2hz8bgz2q2jys"
          }
        }
      },
      "EUR": {
        "monthly": {
          "350": {
            "0": "pri_01jjktrecyx31ptetfb2nkvh3g"
          }
        },
        "yearly": {
          "3500": {
            "0": "pri_01jjktmcq32jnyhc5evq533j99"
          }
        }
      },
      "CAD": {
        "monthly": {
          "500": {
            "0": "pri_01jjktshb9dv746spnpe3hv4yx"
          }
        },
        "yearly": {
          "5000": {
            "0": "pri_01jjktn4xqq2zzrr665pq2jsa4"
          }
        }
      },
      "GBP": {
        "monthly": {
          "350": {
            "0": "pri_01jjktqks08svkht5kha2y0k36"
          }
        },
        "yearly": {
          "3500": {
            "0": "pri_01jjktkdfxvpy6fp2ye8g7zze6"
          }
        }
      },
      "AUD": {
        "monthly": {
          "600": {
            "0": "pri_01jjktt75djfd5d898mfjecgs0"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01jjktnz58ybwpc4063tmh2fbd"
          }
        }
      },
      "NZD": {
        "monthly": {
          "600": {
            "0": "pri_01jjktver782hry7vjmatqchn9"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01jjktpv3p7f6gm1vj8td0eyr1"
          }
        }
      },
      "CHF": {
        "monthly": {
          "400": {
            "0": "pri_01j8m8wtq5vqhxzcwt8xq4ka0v"
          }
        },
        "yearly": {
          "4000": {
            "0": "pri_01j8m8wv3m0xj68saq0ehhjgyt"
          }
        }
      },
      "PLN": {
        "monthly": {
          "1499": {
            "0": "pri_01j8m8wvkmfvr8151rfvypch7h"
          }
        },
        "yearly": {
          "14999": {
            "0": "pri_01j8m8ww2nyhn7fr6ja6ytrfmq"
          }
        }
      },
      "JPY": {
        "monthly": {
          "600": {
            "0": "pri_01j8m8wwjf6nx7pmk54akexpbr"
          }
        },
        "yearly": {
          "6000": {
            "0": "pri_01j8m8wwxsqh8qnpy83be4b7z6"
          }
        }
      },
      "RUB": {
        "monthly": {
          "35000": {
            "0": "pri_01j8m8wxa0k5bbm1whn1v1zd6n"
          }
        },
        "yearly": {
          "350000": {
            "0": "pri_01j8m8wxnnab1n8v9es23mgshk"
          }
        }
      }
    }
  }
};

const PADDLE_EXPERIMENT_PRICES = {
  "test": {
    "premium": {
      "USD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m97ykayyhgthg4xpf0dm6t"
          },
          "200": {
            "0": "pri_01j8m97z0a776dgy8h8pakqseh"
          },
          "300": {
            "0": "pri_01j8m97zdwgdkn9p3kzptrkrhw"
          },
          "400": {
            "0": "pri_01j9xrszg0hy0jzh65wcq62nqb",
            "7": "pri_01je7a360ja50h0g2ej54at3tk",
            "14": "pri_01je7a366cwvdj0axr9cygyrmh",
            "30": "pri_01jp03wa3j8xjmc6d19nygrj1y"
          },
          "500": {
            "0": "pri_01j8m97ztnv0rwk8e8adaph1p4"
          },
          "600": {
            "0": "pri_01j8m980fr6cp774p431ssfmca"
          },
          "700": {
            "0": "pri_01j8m980x1zaxdfwmyhejypfta"
          },
          "800": {
            "0": "pri_01j8m981fy7p9ttzh141vmz946"
          },
          "900": {
            "0": "pri_01j8m981wsg69v4f043vzcp7r9"
          },
          "1000": {
            "0": "pri_01j8m982fffcff0pe6my7jjwfs"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m982ve3xdzkp42sqke5g4n"
          },
          "2000": {
            "0": "pri_01j8m9839ax2z9ar3t6nk7fwkp"
          },
          "3000": {
            "0": "pri_01j8m983pme1qjk189t43am94k"
          },
          "4000": {
            "7": "pri_01je7a36d6d5nxdqd1jf9ffnrn",
            "14": "pri_01je7a36k2ewf0b2d7djvh5605",
            "30": "pri_01jp03xp93c20dcdys0z7acgdm"
          },
          "4500": {
            "0": "pri_01j9xrszwgq0cfjqx0ahr21yee"
          },
          "5000": {
            "0": "pri_01j8m98467svfg84d0g4nr979z"
          },
          "6000": {
            "0": "pri_01j8m984kpvp1j7wd5g51cs5s1"
          },
          "7000": {
            "0": "pri_01j8m9852zx8y2rwvxy66s5wez"
          },
          "8000": {
            "0": "pri_01j8m985gh073qkqckmk4fs6jq"
          },
          "9000": {
            "0": "pri_01j8m985z2ebew6bj58v5mznj5"
          },
          "10000": {
            "0": "pri_01j8m986ad13q7qnvpvk60y8x3"
          }
        }
      },
      "CAD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m986tm4dpaksnrsppwvrep"
          },
          "200": {
            "0": "pri_01j8m9879gek4qheegwwm2eha2"
          },
          "300": {
            "0": "pri_01j8m987pc8gf2jftmj5y7japp"
          },
          "400": {
            "0": "pri_01j9xrt0a1ce59dn9ccgmgtb7g",
            "7": "pri_01je7a36rb29tgythvzpzffqc3",
            "14": "pri_01je7a373v29bzm6e84hsmh1v7"
          },
          "500": {
            "0": "pri_01j8m98863gxe8v7f8wse28kg7",
            "30": "pri_01jp03yrwtznkgdy5kx3sse0m4"
          },
          "600": {
            "0": "pri_01j8m988hx82fkqqx1fv8hj49q"
          },
          "700": {
            "0": "pri_01j8m988zfqvmk6yjtde9fgp7n"
          },
          "800": {
            "0": "pri_01j8m989cwmf3sy09gshrpmxdy"
          },
          "900": {
            "0": "pri_01j8m989wrcc9g7qb82a6kdqms"
          },
          "1000": {
            "0": "pri_01j8m98aa2ect5xzpd4shc8ggb"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m98atcs21v5xngjn9bch9w"
          },
          "2000": {
            "0": "pri_01j8m98bch4ptgd1xnjb2zyq0v"
          },
          "3000": {
            "0": "pri_01j8m98bw8s61xe9y4ybdk0mdp"
          },
          "4000": {
            "7": "pri_01je7a379ry86c6qef5ced5dg7",
            "14": "pri_01je7a37g8msmzs2vt63x3wd7f"
          },
          "4500": {
            "0": "pri_01j9xrt0r0z0ztv63q2gqqqay6"
          },
          "5000": {
            "0": "pri_01j8m98c9exyprbh2t5879qyg9",
            "30": "pri_01jp03zvxskn17dhj9qax0j94e"
          },
          "6000": {
            "0": "pri_01j8m98csm3aw0a1gn941jfcp1"
          },
          "7000": {
            "0": "pri_01j8m98d6e9hr78jeqcdcqxnbg"
          },
          "8000": {
            "0": "pri_01j8m98dk4rdrw0jgad0vwwwg5"
          },
          "9000": {
            "0": "pri_01j8m98dzh3avhjdb6rzvtjxey"
          },
          "10000": {
            "0": "pri_01j8m98ecy9pg2w8tpv7ncwd9v"
          }
        }
      },
      "AUD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m98ewmc1yqm565k2rj4k0m"
          },
          "200": {
            "0": "pri_01j8m98f8v30hkev9hdtan9y9k"
          },
          "300": {
            "0": "pri_01j8m98fpb7c8r4zg0s7bt9hxg"
          },
          "400": {
            "0": "pri_01j9xrt1k5b3p1857pn3snrckq",
            "7": "pri_01je7a37p1vzhrm1trvqnj96n2",
            "14": "pri_01je7a37vgf967by6rvw60b2w2"
          },
          "500": {
            "0": "pri_01j8m98g30ny54gbfn8nvfbkxf"
          },
          "600": {
            "0": "pri_01j8m98gk13qezss99ejsq09h5",
            "30": "pri_01jp042328s1hv1fk5c8avmg1y"
          },
          "700": {
            "0": "pri_01j8m98h0641gbq47nek58w059"
          },
          "800": {
            "0": "pri_01j8m98hcevnxwf0tedr7kqvtp"
          },
          "900": {
            "0": "pri_01j8m98hs4edh55e38v10g29dt"
          },
          "1000": {
            "0": "pri_01j8m98j45475q3kskz375cdc4"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m98jg79nbq1mkyhphxjhbk"
          },
          "2000": {
            "0": "pri_01j8m98jwf7cv4405847fgap2e"
          },
          "3000": {
            "0": "pri_01j8m98k8c6e506aw4cw83z520"
          },
          "4000": {
            "7": "pri_01je7a3815hayy8yxwcx6fd704",
            "14": "pri_01je7a389qag9cnw37daex1vwg"
          },
          "4500": {
            "0": "pri_01j9xrt20sydmfz9hvak3cw3hh"
          },
          "5000": {
            "0": "pri_01j8m98knnfyb9k06jjx7pwp7j"
          },
          "6000": {
            "0": "pri_01j8m98m0zbgtssqpkqfdac3ed",
            "30": "pri_01jp0432f2w2z0f4gcb0dzeshx"
          },
          "7000": {
            "0": "pri_01j8m98mc0spdfny5x3jfyn5ay"
          },
          "8000": {
            "0": "pri_01j8m98mr3zawsjq9qv4awvy4y"
          },
          "9000": {
            "0": "pri_01j8m98n3mtepjb85r5j4mz1ay"
          },
          "10000": {
            "0": "pri_01j8m98ng03csz5118jhhg97br"
          }
        }
      }
    }
  },
  "live": {
    "premium": {
      "USD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m9amzztkr724pcbnavaysh"
          },
          "200": {
            "0": "pri_01j8m9ancwtayfg3g2nzfyecnk"
          },
          "300": {
            "0": "pri_01j8m9anwby89ft9qt0tdnpxnd"
          },
          "400": {
            "0": "pri_01j9xrscm90ajdn223hs0grdqh",
            "7": "pri_01je7aajfpqfmrcn8s62tq9410",
            "14": "pri_01je7aajn9ntgtzprnndxqv35a",
            "30": "pri_01jnkves5nnmbr94948tp3zvcq"
          },
          "500": {
            "0": "pri_01j8m9ap914cf8d2a1f9xef33z"
          },
          "600": {
            "0": "pri_01j8m9apn6had8ancfxvz1sr3r"
          },
          "700": {
            "0": "pri_01j8m9aq1ehx9rvdpsgyf81s26"
          },
          "800": {
            "0": "pri_01j8m9aqebsgx70fynzzs5wkbf"
          },
          "900": {
            "0": "pri_01j8m9aqtysqt086ntwxhk2m7m"
          },
          "1000": {
            "0": "pri_01j8m9ar6t5msy0bm81v5fr9tv"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m9arjx6scqj2eayer9ejkj"
          },
          "2000": {
            "0": "pri_01j8m9arz4h9kpcyskgg65xvwy"
          },
          "3000": {
            "0": "pri_01j8m9asba04d8d8tc31x87b2h"
          },
          "4000": {
            "7": "pri_01je7aajvc70pbsy5vw4mcsfje",
            "14": "pri_01je7aak1hydr2bpzzgp2vfqq2",
            "30": "pri_01jnkvgbgfvamyg2py80kak55p"
          },
          "4500": {
            "0": "pri_01j9xrsd0s5xzdszgntygcpswe"
          },
          "5000": {
            "0": "pri_01j8m9asrtc6mxzww1zhrcm072"
          },
          "6000": {
            "0": "pri_01j8m9at5b12g812fwyj8swyed"
          },
          "7000": {
            "0": "pri_01j8m9atgp0hhg0zhbdy1qk6xm"
          },
          "8000": {
            "0": "pri_01j8m9atx0b90p3tbh2jpjg2hn"
          },
          "9000": {
            "0": "pri_01j8m9av8paat0rx520kemnmz8"
          },
          "10000": {
            "0": "pri_01j8m9avn583nkj0b4d3pvaz8f"
          }
        }
      },
      "CAD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m9aw18rg3531bf04zzh47a"
          },
          "200": {
            "0": "pri_01j8m9awdyewa3h1pydyhc7pd4"
          },
          "300": {
            "0": "pri_01j8m9awtt2j1hs9fas2nxm8jw"
          },
          "400": {
            "0": "pri_01j9xrsdd83yytar6phnzc1kt8",
            "7": "pri_01je7aak7rj12vgejp7hbp26cy",
            "14": "pri_01je7aakdr49tj2bx587xfsck3"
          },
          "500": {
            "0": "pri_01j8m9ax71rz503vc29p33jy9c",
            "30": "pri_01jnkvhqz69vx3b7jxkgcefns4"
          },
          "600": {
            "0": "pri_01j8m9axkcr8nawf7ga822x1za"
          },
          "700": {
            "0": "pri_01j8m9ay0hznkp4tf0fteq56cv"
          },
          "800": {
            "0": "pri_01j8m9aype0pq81sgsr5nmae43"
          },
          "900": {
            "0": "pri_01j8m9az3s9v5p5rhw7a6chgx3"
          },
          "1000": {
            "0": "pri_01j8m9azjq7t712nwphhbr2hrb"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m9azzsqgv763qjmrgtn61w"
          },
          "2000": {
            "0": "pri_01j8m9b0f3ccyjxfkstb4tc341"
          },
          "3000": {
            "0": "pri_01j8m9b0vph6gfzxqphqq3f1t5"
          },
          "4000": {
            "7": "pri_01je7aakkzzwdsjqwbqc6y2va4",
            "14": "pri_01je7aaksycg9q8nptmbdf7xcz"
          },
          "4500": {
            "0": "pri_01j9xrsdsnxwewaenf5ezq6ppk"
          },
          "5000": {
            "0": "pri_01j8m9b18xtf0djqxv3dtbzww8",
            "30": "pri_01jnkvn24ey2fbatm4804jeswc"
          },
          "6000": {
            "0": "pri_01j8m9b1nd9wn3vdr932x6smd0"
          },
          "7000": {
            "0": "pri_01j8m9b21prr3anwjfyfn5cspf"
          },
          "8000": {
            "0": "pri_01j8m9b2ehs0mn36wnsva9xvac"
          },
          "9000": {
            "0": "pri_01j8m9b30qgzc14gjwj05pfrvv"
          },
          "10000": {
            "0": "pri_01j8m9b3d7g3nnpx9qc000nfq8"
          }
        }
      },
      "AUD": {
        "monthly": {
          "100": {
            "0": "pri_01j8m9b3ss9dhnwhr4dm2dxksj"
          },
          "200": {
            "0": "pri_01j8m9b499qaf1434ezdks9hgq"
          },
          "300": {
            "0": "pri_01j8m9b4ngcz8gkjd8pmhnbn9y"
          },
          "400": {
            "0": "pri_01j9xrse69mxszjy9qbs0pekqc",
            "7": "pri_01je7aakzxvzb91bvg2145np0s",
            "14": "pri_01je7aam5dtpd1hxz6ca1npk23"
          },
          "500": {
            "0": "pri_01j8m9b595p7yz5605shjht26z"
          },
          "600": {
            "0": "pri_01j8m9b5vy5abphmr46mz6q8cf",
            "30": "pri_01jnkw6r7vrt2ddnxxp561ch79"
          },
          "700": {
            "0": "pri_01j8m9b6fjr3d1xhp93n3x4nnz"
          },
          "800": {
            "0": "pri_01j8m9b6wkrxb97v4666pe73c8"
          },
          "900": {
            "0": "pri_01j8m9b79cfgzwh6cth96nke46"
          },
          "1000": {
            "0": "pri_01j8m9b7nzmkkgj6w59sfg6paz"
          }
        },
        "yearly": {
          "1000": {
            "0": "pri_01j8m9b82gazwkajy3jd5m9t4g"
          },
          "2000": {
            "0": "pri_01j8m9b8ntpm49r87hnsf3f7zz"
          },
          "3000": {
            "0": "pri_01j8m9b92e76a51r9f2fr8b6ps"
          },
          "4000": {
            "7": "pri_01je7aamb0rvvvxdgk0spwg5hk",
            "14": "pri_01je7aamgx218x0b46wem4vzs4"
          },
          "4500": {
            "0": "pri_01j9xrsemdzaap971gfefnj5rv"
          },
          "5000": {
            "0": "pri_01j8m9b9ee9ehhcc1cb78jnmwd"
          },
          "6000": {
            "0": "pri_01j8m9b9tfzdk8e094b310eydz",
            "30": "pri_01jnkw8gphhcfrsp0b1saxgjep"
          },
          "7000": {
            "0": "pri_01j8m9ba6ft9m9dpcp9vakk786"
          },
          "8000": {
            "0": "pri_01j8m9bahz0kbbq0k1fds533nv"
          },
          "9000": {
            "0": "pri_01j8m9baxpehmqkrmzkq3tgxh2"
          },
          "10000": {
            "0": "pri_01j8m9bb9s9gn7h9c2nks7ch22"
          }
        }
      }
    }
  }
};

const PRODUCT_CONFIG = {
  premium: {
    code: "ME",
    successUrl: "https://accounts.adblockplus.org/premium",
  }
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
const funnelCode = (adblock.query.get("s") || "").trim();
const premiumId = adblock.settings.premiumId = adblock.settings.premiumId || generatePremiumId();
const browserCode = getBrowserCode();
const operatingSystemCode = getOperatingSystemCode();

let isExperiment = false;
let experimentId, experimentVariantId;
adblock.api.flagExperiment = flag => isExperiment = !!flag;
adblock.api.setExperimentId = id => { experimentId = id; isExperiment = true; }
adblock.api.setExperimentVariantId = variant => { experimentVariantId = variant; isExperiment = true; }

let paddleToken = PADDLE_LIVE_TOKEN;

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

if (paddleEnvironment == "test") {
  paddleToken = PADDLE_TEST_TOKEN;
  Paddle.Environment.set("sandbox");
  document.documentElement.classList.add("--paddle-sandbox")
}

function onPaddleEvent (event) {
  if (!event.name || !event.data) return;
  if (!adblock.isLive) console.log(event);
  adblock.trigger(event.name, event.data);
}

const paddleOptions = {
  token: paddleToken,
  eventCallback: onPaddleEvent,
};

if (typeof adblock.paddleOptions == "object") {
  Object.assign(paddleOptions, adblock.paddleOptions);
}

if (location.pathname.endsWith("/premium")) {
  paddleOptions.pwCustomer = {};
}

Paddle.Initialize(paddleOptions);

adblock.on("checkout.loaded", data => {
  if (data?.settings?.display_mode == "inline") {
    document.documentElement.classList.add("--inline-checkout");
  }
});

function reportCheckoutEvent(data) {
  adblock.log("checkout-event", {
    name: name,
    amount: data.custom_data?.amount_cents,
    frequency: data.custom_data?.sub_type,
    currency: data.custom_data?.currency,
    trigger: data.custom_data?.trigger,
  });
}

adblock.on("checkout.loaded", reportCheckoutEvent);
adblock.onceAfter("checkout.customer.created", reportCheckoutEvent);
adblock.onceAfter("checkout.payment.initiated", reportCheckoutEvent);

// FIXME: We should only use this temporarily to avoid breaking ongoing conversion.com experiments
const planCodeCompatibility = {
  "ME": "premium"
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
 * @param {string} [options.trial] - number of trial days
 * @param {string} [options.coupon] - coupon to be applied
 * @param {string} [options.email] - customer email
 * @param {string} [options.flow] - checkout flow being completed (default: page name)
 * @param {string} [options.successUrl] - checkout success URL redirected to
 * @param {string} [options.trigger] - identifier for the source/trigger of the checkout on the page (e.g. button-1)
 */
export const checkout = adblock.api.checkout = function checkout(options) {

  let { product, plan, adblockPlan, currency, frequency, amount, trial, flow, successUrl, coupon, email, trigger } = options;

  const clickTs = Date.now();

  flow = flow || pageName;

  coupon = coupon || adblock.query.get("coupon");

  email = email || adblock.query.get("email");

  trial = Number.isInteger(parseFloat(trial)) ? parseInt(trial, 10) : "0";

  // FIXME: We should only use this temporarily to avoid breaking ongoing conversion.com experiments
  product = product || planCodeCompatibility[plan] || planCodeCompatibility[adblockPlan] || plan || adblockPlan;
  if (!PRODUCT_CONFIG.hasOwnProperty(product)) throw new Error("Invalid product");
  const productCode = PRODUCT_CONFIG[product].code;
  if (plan || adblockPlan) console.warn("Please use checkout({product}) instead of checkout({plan|adblockPlan})");

  const priceId = PADDLE_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount]?.[trial]
  || PADDLE_EXPERIMENT_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount]?.[trial];
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

  const trackingPrefix = (productCode || funnelCode) ? `${productCode}_${funnelCode} ` : "";

  let experiment_id = "";
  let variant_index = -1;
  if (adblock.hasOwnProperty("experiment")) {
    experiment_id = adblock.experiment;
    variant_index = adblock.variant;
  }

  const customData = {
    version: "1.1.0",
    trigger,
    locale,
    page: adblock.settings.page,
    path: location.pathname,
    urlParams: adblock.URLSearchObject(location.search),
    userid: premiumId,
    tracking: `${trackingPrefix}X0G0 F${browserCode}O${operatingSystemCode}S${pageCode} ${premiumId}`,
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

  const checkoutOptions = {
    settings: {
      successUrl,
      locale: PADDLE_LOCALE_EXCEPTIONS[locale] || locale,
    },
    customData,
    items: [{ priceId }],
  };

  adblock.trigger("checkout-options", checkoutOptions);

  if (coupon) checkoutOptions.discountCode = coupon;
  if (email) checkoutOptions.customer = { email };

  Paddle.Checkout.open(checkoutOptions);

};