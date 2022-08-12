# vite-quasar













## プロジェクト作成
以下は本リポジトリを生成するにあたってのコマンド操作

### viteプロジェクト作成
```
yarn create vite

# パッケージインストール
yarn install
# 動作確認
yarn dev
open http://127.0.0.1:5173/
```

### CI用のlinter系
```
yarn add eslint --dev

yarn add --dev prettier

```

### eslint 初期化
```
# ほぼデフォルト設定
yarn run eslint --init

You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y)
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ What format do you want your config file to be in? · YAML
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · yarn
Installing eslint-plugin-vue@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 14 new dependencies.
info Direct dependencies
├─ @typescript-eslint/eslint-plugin@5.33.0
├─ @typescript-eslint/parser@5.33.0
└─ eslint-plugin-vue@9.3.0
info All dependencies
├─ @types/json-schema@7.0.11
├─ @typescript-eslint/eslint-plugin@5.33.0
├─ @typescript-eslint/parser@5.33.0
├─ @typescript-eslint/type-utils@5.33.0
├─ boolbase@1.0.0
├─ cssesc@3.0.0
├─ eslint-plugin-vue@9.3.0
├─ lodash@4.17.21
├─ nth-check@2.1.1
├─ postcss-selector-parser@6.0.10
├─ tslib@1.14.1
├─ util-deprecate@1.0.2
├─ vue-eslint-parser@9.0.3
└─ xml-name-validator@4.0.0
Successfully created .eslintrc.yml file in C:\Users\katuy\app\vue\vite-quasar
Done in 154.84s.
```
