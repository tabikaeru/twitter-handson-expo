# twitter-handson-expo

# GET STARTED

```
yarn
expo start
```

# 実行環境環境

```
node version v12.6.0
yarn version 1.17.3
```

# Blaze Plan が使えない人用

## 説明

Firebase には Blaze プラン(従量課金)と Spark プラン(無料)の２種類があります．
Spark プランでは functions が使えないため，この hands on では基本的に Firebase の Blaze プランを使用する前提で講義を行います．
Blaze プランはかなり無料枠が大きいので基本的にはお金がかからない想定ではありますが，一応絶対無料枠で行いたいと言う人向けにも講義資料を作成しています．
以下の設定は Spark プランを使用する人の設定なので，Blaze プランを使う人は無視してください．

## .env ファイルの設定

.env.example を.env ファイルにリネームして，9 行目の#を消して`FUNCTIONS_EMULATOR_URL`を読み込めるようにする.
