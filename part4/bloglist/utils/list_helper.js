// array of blogs as param
const dummy = (blogs) => {
  console.log('BLOGS array is', blogs)
  return 1
}

// array of blogs as param
// returns sum of likes in list of blogs
const totalLikes = (blogs) => {

  return blogs.reduce((sum, b) => sum + (b.likes || 0), 0)
}

// array of blogs as param
// returns the blog with the most likes
// more than 1 blog will be returned
// when there are more than 1 highest likes of the same value
const favoriteBlog = (blogs) => {

  if (!blogs || blogs.length === 0 || blogs.length === 1) return blogs

  let maxLikes = -Infinity
  const result = []

  for (const b of blogs) {
    const likes = b.likes || 0
    if (likes > maxLikes) {
      maxLikes = likes
      result.length = 0
      result.push(b)
    } else if (likes === maxLikes) {
      result.push(b)
    }
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}