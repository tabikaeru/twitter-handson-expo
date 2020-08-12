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

Firebae には Blaze プラン(従量課金)と Spark プラン(無料)の２種類があります．
Spark Plan では functions が使えないため，この hands on では基本的に Firebae の Blaze Plan を使用する前提で講義を行います．
Blaze Plan はかなり無料枠が大きいので基本的にはお金がかからない想定ではありますが，一応絶対無料枠で行いたいと言う人向けにも講義資料を作成しています．

## .env ファイルの設定

.envExample を.env ファイルにリネームして，9 行目の#を消して`FUNCTIONS_EMULATOR_URL`を読み込めるようにする.
