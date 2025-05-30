const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

// ミドルウェアの設定
app.use(cors())
app.use(express.json())

// スタブデータ
const stubData = {
  "ダイエット": {
    "goal": "ダイエットする",
    "breakdown": [
      {
        "id": 1,
        "text": "食事管理を行う",
        "completed": false,
        "reason": "食事のコントロールは体重管理の基本です。",
        "subtasks": [
          {
            "id": 4,
            "text": "1日の糖質摂取量を20g以下にする",
            "completed": false,
            "smart": true,
            "reason": "糖質制限は脂肪燃焼を促進します。"
          },
          {
            "id": 5,
            "text": "毎日の摂取カロリーを1500kcal以下に制限する",
            "completed": false,
            "smart": true,
            "reason": "摂取カロリーを抑えることで体重減少が期待できます。"
          }
        ]
      },
      {
        "id": 2,
        "text": "運動習慣を身につける",
        "completed": false,
        "reason": "運動は基礎代謝を上げ、健康的なダイエットに不可欠です。",
        "subtasks": [
          {
            "id": 6,
            "text": "スクワット10回×3セットを毎日行う",
            "completed": false,
            "smart": true,
            "reason": "筋トレは基礎代謝を高めます。"
          },
          {
            "id": 7,
            "text": "週3回、30分間のウォーキングをする",
            "completed": false,
            "smart": true,
            "reason": "有酸素運動は脂肪燃焼に効果的です。"
          }
        ]
      },
      {
        "id": 3,
        "text": "生活習慣を改善する",
        "completed": false,
        "reason": "生活リズムの改善は継続的なダイエット成功に繋がります。",
        "subtasks": [
          {
            "id": 8,
            "text": "毎日23時までに就寝する",
            "completed": false,
            "smart": true,
            "reason": "十分な睡眠はホルモンバランスを整えます。"
          },
          {
            "id": 9,
            "text": "1日8杯以上の水を飲む",
            "completed": false,
            "smart": true,
            "reason": "水分補給は代謝を促進します。"
          }
        ]
      }
    ]
  },
  "英語": {
    "goal": "英語を話せるようになる",
    "breakdown": [
      {
        "id": 1,
        "text": "基礎的な英語力を身につける",
        "completed": false,
        "reason": "基礎力がなければ応用力も身につきません。",
        "subtasks": [
          {
            "id": 4,
            "text": "毎日30分、英単語を20個覚える",
            "completed": false,
            "smart": true,
            "reason": "語彙力は英語力の土台です。"
          },
          {
            "id": 5,
            "text": "週3回、英文法の基礎を学習する",
            "completed": false,
            "smart": true,
            "reason": "文法理解は正確な表現に不可欠です。"
          },
          {
            "id": 6,
            "text": "毎日英語のリスニングを15分行う",
            "completed": false,
            "smart": true,
            "reason": "リスニング力は会話力向上に直結します。"
          }
        ]
      },
      {
        "id": 2,
        "text": "実践的な会話力を鍛える",
        "completed": false,
        "reason": "実践練習で使える英語が身につきます。",
        "subtasks": [
          {
            "id": 7,
            "text": "週2回、オンライン英会話レッスンを受講する",
            "completed": false,
            "smart": true,
            "reason": "実際に話すことでアウトプット力が鍛えられます。"
          },
          {
            "id": 8,
            "text": "毎日英語で日記を書く",
            "completed": false,
            "smart": true,
            "reason": "日記は表現力と継続力を養います。"
          },
          {
            "id": 9,
            "text": "週末に英語の映画を1本観る",
            "completed": false,
            "smart": true,
            "reason": "映画は実用的な表現やリスニング力向上に役立ちます。"
          }
        ]
      },
      {
        "id": 3,
        "text": "英語環境に身を置く",
        "completed": false,
        "reason": "日常的に英語に触れることで自然と身につきます。",
        "subtasks": [
          {
            "id": 10,
            "text": "スマートフォンの言語設定を英語に変更する",
            "completed": false,
            "smart": true,
            "reason": "日常的に英語に触れる機会を増やします。"
          },
          {
            "id": 11,
            "text": "英語のポッドキャストを毎日聴く",
            "completed": false,
            "smart": true,
            "reason": "リスニング力と語彙力の向上に役立ちます。"
          },
          {
            "id": 12,
            "text": "英語のニュースサイトを毎日読む",
            "completed": false,
            "smart": true,
            "reason": "最新の話題を英語で学べます。"
          }
        ]
      }
    ]
  }
}

// APIエンドポイント
app.post('/api/todos/breakdown', (req, res) => {
  const { goal } = req.body
  
  // 目標に応じて適切なレスポンスを返す
  if (goal.includes('ダイエット')) {
    res.json(stubData['ダイエット'])
  } else if (goal.includes('英語')) {
    res.json(stubData['英語'])
  } else {
    // デフォルトはダイエットのデータを返す
    res.json(stubData['ダイエット'])
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
