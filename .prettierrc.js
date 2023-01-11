module.exports = {
  "semi": false,
  "printWidth": 120,
  "singleQuote": true,
  "quoteProps": "consistent",
  "overrides": [
    {
      "files": ["*.json"],
      "options": {
        "singleQuote": false,
        "quoteProps": "preserve"
      }
    }
  ]
}