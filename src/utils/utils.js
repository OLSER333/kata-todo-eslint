const getTime = (mls) => {
  const allSec = Math.round(mls / 1000)
  const min = Math.floor(allSec / 60)
    .toString()
    .padStart(2, '0')
  const sec = (allSec % 60).toString().padStart(2, '0')
  return `${min}:${sec} `
}

export { getTime }
