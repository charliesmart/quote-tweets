const observerConfig = {
  attributes: false,
  subtree: true,
  childList: true,
}

const observer = new MutationObserver(handleNewTweets);
const searchURLPrefix = 'https://twitter.com/search?q=';
const twitterURLPrefix = 'https://twitter.com';

// Handle the tweets that come pre-loaded
function init() {
  // Observe the page body for changes, including new tweets or navigation
  observer.observe(document.body, observerConfig);

  grabTweets(document);
}

function grabTweets($el) {
  let $tweets = $el.querySelectorAll('.js-stream-tweet:not(.quote-added)');
  [].forEach.call($tweets, addButtonToTweet);
}

// Handle tweets as they're added to the stream
function handleNewTweets(mutations) {
  mutations.forEach(mutation => {
    // For each added node (a node can include a thread of tweets)...
    mutation.addedNodes.forEach($node => {
      // If it's a DOM element...
      if ($node.nodeType === Node.ELEMENT_NODE) {
        // Grab all the tweets inside
        grabTweets($node);
      }
    })
  });
}

// Take a tweet, grab its permalink url, generate a search query, add a button
function addButtonToTweet($tweet) {
  // Add a class to make sure we don't add a second button
  $tweet.classList.add('quote-added');

  let permalink = $tweet.dataset.permalinkPath;

  let $actions = $tweet.getElementsByClassName('js-actions');

  if ($actions) {
    let $button = document.createElement('a');
    $button.href = searchURLPrefix + encodeURIComponent(twitterURLPrefix + permalink);
    $button.target = '_blank';
    $button.className = 'quote-button';
    $actions[0].appendChild($button);
  }
}

// Start it up
init();
