# クラス PuddleDB

## 概要
JSONファイルをデータベースを操作するように処理する。

### 静的メソッド
- [**PuddleDB.USE**](#puddledbuse) JSONファイルの読み込みとスキーマの指定を行う。

### ゲッター
- [**file_path**](#file_path) データが記録されているJSONファイルのパス。
- [**schema**](#schema) データの構造。

### メソッド
- **SELECT** データの検索をキーワードを用いて行う。
- **SELECTIF** データの検索を条件を用いて行う。
- **RESULT** データの取り出しやフォーマットを行う。
- **INSERT** データを追加する。
- **UPDATE** データを更新する。
- **REMOVE** データを取り除く。
- **DELETE** データを削除する。

## 詳細

### 静的メソッド

#### PuddleDB.USE
> JSONファイルの読み込みとスキーマの指定を行う。
> 
> ##### 引数
> - **file_path**(`string`) JSONファイルのパス。存在しなければ作成する。
> - **schema**(`Schema`) データの構造。
> ##### 戻り値
> - PuddleDBのインスタンス
> 
> ```typescript
> const USERS = PuddleDB.USE("./users.json", {
>     id:     ["UNIQUE", "NOT NULL", "AUTO INCREMENT"],
>     name:   ["NOT NULL"],
>     age:    []
> });
> ```

### ゲッター

#### .file_path
> データが記録されているJSONファイルのパス。

#### .schema
> データの構造。

### メソッド

#### .SELECT
> データの検索をキーワードを用いて行う。
> 
> ##### 引数
> - **where**(`{ [key: string]: any }`) カラム名がキーで実際の値がバリューである連想配列。
> - **limit**(`?number`) 取得するデータの最大数。
> ##### 戻り値
> - 第一引数(where)のカラムをすべて含むデータをまとめたPuddleDBインスタンスを返す。
> 
> ```typescript
> USERS.SELECT({ id: 1 }, 1).RESULT();
> ```