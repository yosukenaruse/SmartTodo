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
        "subtasks": [
          {
            "id": 4,
            "text": "1日の糖質摂取量を20g以下にする",
            "completed": false,
            "smart": true
          },
          {
            "id": 5,
            "text": "毎日の摂取カロリーを1500kcal以下に制限する",
            "completed": false,
            "smart": true
          }
        ]
      },
      {
        "id": 2,
        "text": "運動習慣を身につける",
        "completed": false,
        "subtasks": [
          {
            "id": 6,
            "text": "スクワット10回×3セットを毎日行う",
            "completed": false,
            "smart": true
          },
          {
            "id": 7,
            "text": "週3回、30分間のウォーキングをする",
            "completed": false,
            "smart": true
          }
        ]
      },
      {
        "id": 3,
        "text": "生活習慣を改善する",
        "completed": false,
        "subtasks": [
          {
            "id": 8,
            "text": "毎日23時までに就寝する",
            "completed": false,
            "smart": true
          },
          {
            "id": 9,
            "text": "1日8杯以上の水を飲む",
            "completed": false,
            "smart": true
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
        "subtasks": [
          {
            "id": 4,
            "text": "毎日30分、英単語を20個覚える",
            "completed": false,
            "smart": true
          },
          {
            "id": 5,
            "text": "週3回、英文法の基礎を学習する",
            "completed": false,
            "smart": true
          },
          {
            "id": 6,
            "text": "毎日英語のリスニングを15分行う",
            "completed": false,
            "smart": true
          }
        ]
      },
      {
        "id": 2,
        "text": "実践的な会話力を鍛える",
        "completed": false,
        "subtasks": [
          {
            "id": 7,
            "text": "週2回、オンライン英会話レッスンを受講する",
            "completed": false,
            "smart": true
          },
          {
            "id": 8,
            "text": "毎日英語で日記を書く",
            "completed": false,
            "smart": true
          },
          {
            "id": 9,
            "text": "週末に英語の映画を1本観る",
            "completed": false,
            "smart": true
          }
        ]
      },
      {
        "id": 3,
        "text": "英語環境に身を置く",
        "completed": false,
        "subtasks": [
          {
            "id": 10,
            "text": "スマートフォンの言語設定を英語に変更する",
            "completed": false,
            "smart": true
          },
          {
            "id": 11,
            "text": "英語のポッドキャストを毎日聴く",
            "completed": false,
            "smart": true
          },
          {
            "id": 12,
            "text": "英語のニュースサイトを毎日読む",
            "completed": false,
            "smart": true
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
