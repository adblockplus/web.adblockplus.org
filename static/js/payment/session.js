/* global eyeo */
(function(ns){

/* A payment session is a unique payment flow identifier that has user
 * testing, support troubleshooting, and application performance information
 * encoded into it for convinience. e.g. to better understand the context of a 
 * report when investigating an incident or incidents in aggregate.
 */

var CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

function getRandomChars(length)
{
  var string = "";
  for (var i = 0; i < length; i++)
    string += CHARS.charAt(Math.floor(Math.random() * CHARS.length));  
  return string;
}

function zeroPad(input, length)
{
  var string = String(input);

  if (string.length < length)
    for (var i = string.length; i < length; i++)
      string = "0" + string;

  return string;
}

function getConfig(key, pad, test)
{
  var result = zeroPad("x", pad);

  if (typeof ns[key] != "undefined")
  {
    result = String(ns[key]);

    if (result.length < pad) result = zeroPad(result, pad);

    if (!test.test(result)) result = zeroPad("f", pad);
  }
  
  return result;
}

// Payment page ID, set manually in page, limited to 1 char
function getPageId()
{
  return getConfig("pageId", 1, /^[0-3]{1}$/)
}

// Payment campaign ID, set manually in page, limited to 3 char
function getCampaignId()
{
  return getConfig("campaignId", 3, /^[a-z0-9]{3}$/);
}

// Split test ID, set manually in page, limited to 4 chars
function getTestId()
{
  return getConfig("testId", 4, /^[a-z0-9]{4}$/);
}

// Split test variant ID, set manually in page, limited to 1 char
function getVariantId()
{
  return getConfig("variantId", 1, /^[a-z0-9]{1}$/);
}

/* Zero padded performance timestamp in milliseconds, limited to 8 chars
 * "0000000a" if performance.now is not available
 * "0000000b" if runtime has exceeded 99999999 milliseconds already
 */
function createPerformanceTimestamp()
{
  var now;

  try {
    now = String(parseInt(String(performance.now()), 10));
  } catch {
    now = "a";
  }

  if (now.length > 8)
    now = "b";

  return zeroPad(now, 8);
}

// YYYYMMDDHHSS format date timestamp
function createDatetimestamp()
{
  var date = new Date();

  return String(date.getUTCFullYear()).slice(-2) 
  + zeroPad(String(date.getUTCMonth() + 1), 2) 
  + zeroPad(String(date.getUTCDate()), 2)
  + zeroPad(String(date.getUTCHours()), 2)
  + zeroPad(String(date.getUTCMinutes()), 2)
  + zeroPad(String(date.getUTCSeconds()), 2);
}

var session;

/** Get or create and get payment session */
ns.getSession = function()
{
  if (!session)
  {
    session = ""
    + getVariantId() + "-"
    + getPageId() + "-"
    + createPerformanceTimestamp() + "-"
    + getTestId() + "-"
    + "4" + getCampaignId() + "-"
    + getRandomChars(4) + "-"
    + createDatetimestamp();
  }

  return session;
};

})(path("payment"));