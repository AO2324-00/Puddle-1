# クラス PuddleParser

## 概要

### 静的メソッド
- **PuddleParser.assignToVariables** 変数を含む文字列に値を代入する。

## 詳細

### 静的メソッド

> #### PuddleParser.assignToVariables(template_text: string, variables: Variables)
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

---
<br>

# クラス PuddleNoticer

## 概要

### 静的変数
- **PuddleNoticer.language** 通知の言語設定。
- **PuddleNoticer.output** コンソールに通知を出力するかどうか。
- **PuddleNoticer.save** 通知を記録するかどうか。
- **PuddleNoticer.destination_directory** 通知を記録する際の保存先ディレクトリパス。

### 静的メソッド
- **PuddleNoticer.Request** リクエストを通知する。
- **PuddleNoticer.Info** 情報を通知する。
- **PuddleNoticer.Warning** 警告を通知する。
- **PuddleNoticer.Error** エラーを通知して処理を停止する。

## 詳細

### 静的変数
> #### PuddleNoticer.language
> 通知の言語設定。
> デフォルトは`"en"`

> #### PuddleNoticer.output
> コンソールに通知を出力するかどうか。
> デフォルトは`true`

> #### PuddleNoticer.save
> 通知を記録するかどうか。
> デフォルトは`false`

> #### PuddleNoticer.destination_directory
> 通知を記録する際の保存先ディレクトリパス。
> デフォルトは`"./log"`

### 静的メソッド

> #### PuddleNoticer.Request(module_name: string, notice_name: string, variables?: Variables)
> リクエストを通知する。
> 
> ##### 引数
> - **module_name** モジュール名。
> - **notice_name** 通知名称。
> - **variables** 変数とその値を格納した連想配列。例：`{ var: "Variable" }`
> ##### 戻り値
> - 実際に通知されたテキスト。

> #### PuddleNoticer.Info(module_name: string, notice_name: string, variables?: Variables)
> 情報を通知する。
> 
> ##### 引数
> - **module_name** モジュール名。
> - **notice_name** 通知名称。
> - **variables** 変数とその値を格納した連想配列。例：`{ var: "Variable" }`
> ##### 戻り値
> - 実際に通知されたテキスト。

> #### PuddleNoticer.Warning(module_name: string, notice_name: string, variables?: Variables)
> 警告を通知する。
> 
> ##### 引数
> - **module_name** モジュール名。
> - **notice_name** 通知名称。
> - **variables** 変数とその値を格納した連想配列。例：`{ var: "Variable" }`
> ##### 戻り値
> - 実際に通知されたテキスト。

> #### PuddleNoticer.Error(module_name: string, notice_name: string, variables?: Variables)
> エラーを通知して処理を停止する。
> 
> ##### 引数
> - **module_name** モジュール名。
> - **notice_name** 通知名称。
> - **variables** 変数とその値を格納した連想配列。例：`{ var: "Variable" }`
> ##### 戻り値
> - 実際に通知されたテキスト。