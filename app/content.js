const observerConfig = {
  attributes: false,
  subtree: false,
  childList: true, // Watch for new tweets
}

const observer = new MutationObserver(handleNewTweets);
const searchURLPrefix = 'https://twitter.com/search?q=';
const twitterURLPrefix = 'https://twitter.com'

// Grab the stream to observe
const $stream = document.getElementsByClassName('stream-items')[0];

// Observe it
observer.observe($stream, observerConfig);

// Handle the tweets that come pre-loaded
function init() {
  let $tweets = document.getElementsByClassName('js-stream-tweet');
  [].forEach.call($tweets, addButtonToTweet);
}

// Handle tweets as they're added to the stream
function handleNewTweets(mutations) {
  mutations.forEach(mutation => {
    // For each added node (a node can include a thread of tweets),
    mutation.addedNodes.forEach($node => {
      // Grab the tweets
      let $tweets = $node.getElementsByClassName('js-stream-tweet');
      // Add the buttons
      [].forEach.call($tweets, addButtonToTweet);
    })
  });
}

// Take a tweet, grab its permalink url, generate a search query, add a button
function addButtonToTweet($tweet) {
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
