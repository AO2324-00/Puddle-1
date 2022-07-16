# クラス一覧
- [**クラス PuddleParser**](#クラス-puddleparser) 文字列の解析や変換を行う。
- [**クラス PuddleNoticer**](#クラス-puddlenoticer) メッセージの通知や記録を行う。

<br>

# クラス PuddleParser

## 概要
文字列の解析や変換を行う。

### 静的メソッド
- [**PuddleParser.assignToVariables**](#puddleparserassigntovariablestemplatetext-string-variables-variables) 変数を含む文字列に値を代入する。

## 詳細

### 静的メソッド

#### PuddleParser.assignToVariables(template_text: string, variables: Variables)
> 変数を含む文字列に値を代入する。
> 
> ##### 引数
> - **template_text** 変数を含んだ文字列。例：`"ABC{{var}}GHI"`
> - **variables** 変数とその値を格納した連想配列。例：`{ var: "DEF" }`
> ##### 戻り値
> - 変数を代入した文字列。例：`"ABCDEFGHI"`
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
- [**PuddleNoticer.destination_directory**](#puddlenoticerdestinationdirectory) 通知を記録する際の保存先ディレクトリパス。

### 静的メソッド
- [**PuddleNoticer.Info**](#puddlenoticerinfomessage-string) 情報を通知する。
- [**PuddleNoticer.Warning**](#puddlenoticerwarningmessage-string) 警告を通知する。
- [**PuddleNoticer.Error**](#puddlenoticererrormessage-string) エラーを通知して処理を停止する。

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

#### PuddleNoticer.Info(message: string)
> 任意の情報を通知する。
> 
> ##### 引数
> - **message** メッセージ。
> ##### 戻り値
> - 実際に通知されたテキスト。

#### PuddleNoticer.Warning(message: string)
> 任意の警告を通知する。
> 
> ##### 引数
> - **message** メッセージ。
> ##### 戻り値
> - 実際に通知されたテキスト。

#### PuddleNoticer.Error(message: string)
> 任意のエラーを通知して処理を停止する。
> 
> ##### 引数
> - **message** メッセージ。
> ##### 戻り値
> - 実際に通知されたテキスト。