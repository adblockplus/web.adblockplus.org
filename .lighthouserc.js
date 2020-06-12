module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox'
      },
      url: [
        'http://localhost:5000/en',
        'http://localhost:5000/en/download',
        'http://localhost:5000/en/adblock-plus-chrome',
        'http://localhost:5000/en/donate'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.65}],
        'categories:accessibility': ['error', {minScore: 0.65}],
        'categories:best-practices': ['error', {minScore: 0.65}],
        'categories:seo': ['error', {minScore: 0.65}],
        'first-contentful-paint': ['warn', {maxScore: 1}]
      }
    }
  }
};
