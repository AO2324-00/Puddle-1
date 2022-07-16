# 目次
- [**ファイルの読み書き**](#ファイルの読み書き) Deno標準APIの紹介。
- [**クラス PuddleParser**](#クラス-puddleparser) 文字列の解析や変換を行う。
- [**クラス PuddleNoticer**](#クラス-puddlenoticer) メッセージの通知や記録を行う。

<br>

# ファイルの読み書き

## 概要
ファイルの読み書きはDeno標準のAPIで提供されています。
- [**Deno.readFile**](#denoreadfile) ファイルの全内容をバイト配列として読み込む。
- [**Deno.readFileSync**](#denoreadfilesync) ファイルの全内容をバイト配列として同期的に読み込む。
- [**Deno.readTextFile**](#denoreadtextfile) 非同期でファイルの全内容をutf8エンコードされた文字列として読み込む。
- [**Deno.readTextFileSync**](#denoreadtextfilesync) ファイルの全内容をutf8エンコードされた文字列として同期的に読み込む。
- [**Deno.writeFile**](#denowritefile) 与えられたパスにデータを書き込む。
- [**Deno.writeFileSync**](#denowritefilesync) 与えられたパスにデータを同期的に書き込む。
- [**Deno.writeTextFile**](#denowritetextfile) 非同期で文字列データを与えられたパスに書き込む。
- [**Deno.writeTextFileSync**](#denowritetextfilesync) 同期的に文字列データを与えられたパスに書き込む。

## 詳細

#### Deno.readFile
> ファイルの全内容をバイト配列として読み込む。
> ##### 引数
> - **path**(`string`) ファイルパス。
> - **options**(`?ReadFileOptions`) [ReadFileOptions](https://doc.deno.land/deno/stable/~/Deno.ReadFileOptions)
> ##### 戻り値
> - **`Promise<Uint8Array>`**

#### Deno.readFileSync
> ファイルの全内容をバイト配列として同期的に読み込む。
> ##### 引数
> - **path**(`string`) ファイルパス。
> - **options**(`?ReadFileOptions`) [ReadFileOptions](https://doc.deno.land/deno/stable/~/Deno.ReadFileOptions)
> ##### 戻り値
> - **`Uint8Array`**

#### Deno.readTextFile
> 非同期でファイルの全内容をutf8エンコードされた文字列として読み込む。
> ##### 引数
> - **path**(`string`) ファイルパス。
> - **options**(`?ReadFileOptions`) [ReadFileOptions](https://doc.deno.land/deno/stable/~/Deno.ReadFileOptions)
> ##### 戻り値
> - **`Promise<string>`**
> ```typescript
> const data = await Deno.readTextFile("hello.txt");
> console.log(data);
> ```

#### Deno.readTextFileSync
> ファイルの全内容をutf8エンコードされた文字列として同期的に読み込む。
> ##### 引数
> - **path**(`string`) ファイルパス。
> - **options**(`?ReadFileOptions`) [ReadFileOptions](https://doc.deno.land/deno/stable/~/Deno.ReadFileOptions)
> ##### 戻り値
> - **`string`**
> ```typescript
> const data = Deno.readTextFileSync("hello.txt");
> console.log(data);
> ```

#### Deno.writeFile
> 与えられたパスにデータを書き込む。ファイルがなければ作成する。
> ##### 引数
> - **path**(`string | URL`) ファイルパス。
> - **data**(`Uint8Array`) データ。
> - **options**(`?WriteFileOptions`) [WriteFileOptions](https://doc.deno.land/deno/stable/~/Deno.WriteFileOptions)
> ##### 戻り値
> - **`Promise<void>`**

#### Deno.writeFileSync
> 与えられたパスにデータを同期的に書き込む。ファイルがなければ作成する。
> ##### 引数
> - **path**(`string | URL`) ファイルパス。
> - **data**(`Uint8Array`) データ。
> - **options**(`?WriteFileOptions`) [WriteFileOptions](https://doc.deno.land/deno/stable/~/Deno.WriteFileOptions)
> ##### 戻り値
> - **`void`**

#### Deno.writeTextFile
> 非同期で文字列データを与えられたパスに書き込む。ファイルがなければ作成する。
> ##### 引数
> - **path**(`string | URL`) ファイルパス。
> - **data**(`string`) データ。
> - **options**(`?WriteFileOptions`) [WriteFileOptions](https://doc.deno.land/deno/stable/~/Deno.WriteFileOptions)
> ##### 戻り値
> - **`Promise<void>`**
> ```typescript
> await Deno.writeTextFile("hello1.txt", "Hello world\n");
> ```

#### Deno.writeTextFileSync
> 同期的に文字列データを与えられたパスに書き込む。ファイルがなければ作成する。
> ##### 引数
> - **path**(`string | URL`) ファイルパス。
> - **data**(`string`) データ。
> - **options**(?WriteFileOptions) [WriteFileOptions](https://doc.deno.land/deno/stable/~/Deno.WriteFileOptions)
> ##### 戻り値
> - **`void`**
> ```typescript
> Deno.writeTextFileSync("hello1.txt", "Hello world\n");
> ```

<br>

# クラス PuddleParser

## 概要
文字列の解析や変換を行う。

### 静的メソッド
- [**PuddleParser.assignToVariables**](#puddleparserassigntovariables) 変数を含む文字列に値を代入する。

## 詳細

### 静的メソッド

#### PuddleParser.assignToVariables
> 変数を含む文字列に値を代入する。
> 
> ##### 引数
> - **template_text**(`string`) 変数を含んだ文字列。例：`"ABC{{var}}GHI"`
> - **variables**(`?Valiables`) 変数とその値を格納した連想配列。例：`{ var: "DEF" }`
> ##### 戻り値
> - **`string`** 変数を代入した文字列。例：`"ABCDEFGHI"`
> 
> ```typescript
> const template_text = `ABC{{var}}GHI`;
> const variables = { var: "DEF" };
> const text = PuddleParser.assignToVariables(template_text, variables);
> console.log(text); // ABCDEFGHI
> ```

<br>

# クラス PuddleNoticer

## 概要
メッセージの通知や記録を行う。

### 静的変数
- [**PuddleNoticer.language**](#puddlenoticerlanguage) 通知の言語設定。
- [**PuddleNoticer.output**](#puddlenoticeroutput) コンソールに通知を出力するかどうか。
- [**PuddleNoticer.save**](#puddlenoticersave) 通知を記録するかどうか。
- [**PuddleNoticer.destination_directory**](#puddlenoticerdestination_directory) 通知を記録する際の保存先ディレクトリパス。

### 静的メソッド
- [**PuddleNoticer.Info**](#puddlenoticerinfo) 情報を通知する。
- [**PuddleNoticer.Warning**](#puddlenoticerwarning) 警告を通知する。
- [**PuddleNoticer.Error**](#puddlenoticererror) エラーを通知して処理を停止する。

## 詳細

### 静的変数
#### PuddleNoticer.language
> 通知の言語設定。
> デフォルトは`"en"`

#### PuddleNoticer.output
> コンソールに通知を出力するかどうか。
> デフォルトは`true`

#### PuddleNoticer.save
> 通知を記録するかどうか。
> デフォルトは`false`

#### PuddleNoticer.destination_directory
> 通知を記録する際の保存先ディレクトリパス。
> デフォルトは`"./log"`

### 静的メソッド

#### PuddleNoticer.Info
> 任意の情報を通知する。
> 
> ##### 引数
> - **message**(`string`) メッセージ。
> ##### 戻り値
> - **`string`** 実際に通知されたテキスト。
> ```typescript
> PuddleNoticer.Info("メッセージ");
> // [Info] メッセージ (Sun Apr 01 20XX 00:00:00 GMT+0900 (GMT+09:00))
> ```

#### PuddleNoticer.Warning
> 任意の警告を通知する。
> 
> ##### 引数
> - **message**(`string`) メッセージ。
> ##### 戻り値
> - **`string`** 実際に通知されたテキスト。
> ```typescript
> PuddleNoticer.Info("メッセージ");
> // [Warning] メッセージ (Sun Apr 01 20XX 00:00:00 GMT+0900 (GMT+09:00))
> ```

#### PuddleNoticer.Error
> 任意のエラーを通知して処理を停止する。
> 
> ##### 引数
> - **message**(`string`) メッセージ。
> ##### 戻り値
> - **`string`** 実際に通知されたテキスト。
> ```typescript
> PuddleNoticer.Info("メッセージ");
> // [Error] メッセージ (Sun Apr 01 20XX 00:00:00 GMT+0900 (GMT+09:00))
> ```