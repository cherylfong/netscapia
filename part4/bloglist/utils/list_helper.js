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

module.exports = {
  dummy,
  totalLikes
}