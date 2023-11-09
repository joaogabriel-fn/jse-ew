class Fibonacci {
  * execute (input, current=0, next=1) {
    // yield 0
    // yield 1
    // yield 2
    // yield 3

    // const results = []

    // results.push(0)
    // results.push(1)
    // results.push(2)
    // results.push(3)

    // return results

    // processou todas as sequencias e para
    if (input === 0) {
      return
    }
    
    // retorna o valor
    yield current

    // delega a função mas não retorna valor
    yield * this.execute(input -1, next, current + next)

  }
}

module.exports = Fibonacci
