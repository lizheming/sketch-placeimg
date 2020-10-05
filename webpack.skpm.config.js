module.exports = function (config, entry) {
  config.module.rules.push({
    test: /\.html$/,
    use: [
      { loader: "@skpm/extract-loader" },
      {
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              { tag: 'img', attribute: 'src', type: 'src' },
              { tag: 'link', attribute: 'href', type: 'src' }
            ]
          }
        }
      }
    ]
  });
}