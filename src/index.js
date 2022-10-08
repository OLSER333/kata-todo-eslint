import React from 'react'
import ReactDOM from 'react-dom/client'

import './App.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// сохраняем текущий момент в localStorage по id,
// отображаем по id  Date.now - LS.getItem(id)
// обновляем setTimeout 1000?
// В инпуты вводится количество минут/секунд для таймера задачи.
// Если таймер имеет значение, он уменьшается до 00:00, не даёт ввести пустое значение

// works:
// press Enter -> saved (мне нужен LS(id, expiriedTime))

//
//
// /////Если инпуты пустые задача создаётся с таймером 00:00
// ///////Если таймер 00:00 то таймер увеличивается
