const path = require("path");

module.exports = {
  // entry セクションは、最初に読み込むファイルを指定します。
  // ここで指定されたファイルから別のファイルを読み込む処理が書かれていると、webpack はそれらのファイルも自動的に読み込んで、最終的に1つのファイルとして出力してくれます。
  //   React は JSX という独自の構文を使いビューを定義します。
  // その際は .tsx というファイル拡張子を使います。

  entry: "./src/index.tsx",
  // module の rules セクションで、webpack に対してビルド時に追加で行う処理を記述します。
  // 以下の記述は .ts で終わるファイルに対して、ts-loader を実行する、というような意味を持ちます。
  // exclude は除外するファイルを正規表現で指定します。
  // node_modules 配下のファイル（＝外部ライブラリ）は特にビルドする必要がないので除外します。
  // x? =「x の有無は任意」という意味合い

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // resolve セクションは、モジュールとして解決するファイルの拡張子を指定
  // モジュールとして解決する、つまり外部ファイルやライブラリ（node_modules 以下のファイル）を使うファイルの拡張子なので .tsx と .js の両方を指定
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  // output セクションは、出力するファイルの設定をします。
  // 以下の設定は、webpack.config.js の置いてあるディレクトリにある dist というディレクトリに対して、ファイル名 index.js で出力します。
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },
};
