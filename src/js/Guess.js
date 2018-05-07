import GuessCore from './GuesserCoreHelper.js'
import GuessGame from './GuesserGameHelper.js'
import GuessInputs from './GuesserInputHelper.js'
import MyGuesses from './MyGuesserHelper.js'

const GuessHelper = {

  contract: null,

  instance: null,

  address: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      if (self.instance === null) {
        // self.contract = contract(Guess)
        self.instance = 1
        self.contract.setProvider(window.web3.currentProvider)

        if (typeof self.contract.currentProvider.sendAsync !== 'function') {
          self.contract.currentProvider.sendAsync = function () {
            return self.contract.currentProvider.send.apply(
              self.contract.currentProvider, arguments
            )
          }
        }

        // instantiate by address
        // self.instance = self.contract.at('0x2f01348757b273ef2d95d5df76ef795f883b5c1f')

        // self.contract.deployed().then(instance => {
        // self.instance = instance

        // Getting the accounts
        window.web3.eth.getAccounts(function (error, accounts) {
          if (error) {
            // console.log(error)
            reject()
          } else {
            self.address = accounts
            resolve()
          }
        })

        // Getting events
        self.GuessCreated = self.instance.GuessCreated()
        self.GuessVoted = self.instance.GuessVoted()
        self.GuessValidated = self.instance.GuessValidated()
        self.ProfitsReturned = self.instance.ProfitsReturned()
        self.TestValue = self.instance.test_value()

        // })
      } else {
        resolve()
      }
    })
  },

  getAddressRefreshed: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      // Getting the accounts
      window.web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          // console.log(error)
          resolve(null)
        } else {
          self.address = accounts
          resolve(accounts)
        }
      })
    })
  },

  CreatedGuessEvent: function () {
    this.GuessCreated.watch(function (error, result) {
      if (!error) {
        console.log('No error on creating guess event catcher! See: ', result)
      } else {
        return error
      }
    })
  },

  VotedGuessEvent: function () {
    this.GuessVoted.watch(function (error, result) {
      if (!error) {
        console.log('No error on voting guess event catcher! See: ', result)
      } else {
        return error
      }
    })
  },

  ValidatedGuessEvent: function () {
    this.GuessValidated.watch(function (error, result) {
      if (!error) {
        console.log('No error on validating guess event catcher! See: ', result)
      } else {
        return error
      }
    })
  },

  ReturnedProfitsEvent: function () {
    this.ProfitsReturned.watch(function (error, result) {
      if (!error) {
        console.log('No error on returning profit event catcher! See: ', result)
      } else {
        return error
      }
    })
  },

  TestValue: function () {
    this.TestValue.watch(function (error, result) {
      if (!error) {
        console.log('Test Value: ', result)
      } else {
        console.log(error)
      }
    })
  },

  setGuessFront: function (
    _title,
    _description,
    _topic,
    _finalDate,
    _validationDate,
    _option1,
    _option2) {
    return GuessInputs.init(this.address).then(() => {
      console.log('Title: ', _title)
      return GuessInputs.setGuessFront(
        _title,
        _description,
        _topic,
        _finalDate,
        _validationDate,
        _option1,
        _option2
      )
    })
  },

  getGuessFront: function (index) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessFront(index).catch((err) => {
        return err
      })
    })
  },

  getGuessOptions: function (index) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessOptions(index).catch((err) => {
        return err
      })
    })
  },

  getGuessOptionsProfits: function (index) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessOptionsProfits(index).catch((err) => {
        return err
      })
    })
  },

  getGuessOfTheDay: function (topic) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessOfTheDay(topic).catch((err) => {
        return err
      })
    })
  },

  getGuessOfTheWeek: function (topic) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessOfTheWeek(topic).catch((err) => {
        return err
      })
    })
  },

  getGuessesByDate: function (index, topic, date) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessesByDate(index, topic, date).catch((err) => {
        return err
      })
    })
  },

  getGuessesByWeek: function (index, topic, date) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessesByWeek(index, topic, date).catch((err) => {
        return err
      })
    })
  },

  getGuessesNumber: function () {
    return GuessCore.init().then(() => {
      return GuessGame.getGuessesNumber().catch((err) => {
        return err
      })
    })
  },

  voteGuess: function (_guessIndex, _option, ethAmount) { // Option has to be between 1 and 2
    return GuessInputs.init(this.address).then(() => {
      return GuessInputs.voteGuess(
        _guessIndex,
        _option,
        ethAmount
      )
    })
  },

  validateGuess: function (_guessIndex, _option) {
    return GuessInputs.init(this.address).then(() => {
      return GuessInputs.validateGuess(
        _guessIndex,
        _option
      )
    })
  },

  getGuessesToValidate: function (index, date) {
    return GuessGame.init().then(() => {
      return GuessGame.getGuessesToValidate(index, date).catch((err) => {
        return err
      })
    })
  },

  getCurrentGuessesByAddress: function (index) {
    return MyGuesses.init(this.address).then(() => {
      return MyGuesses.getCurrentGuessesByAddress(index).catch((err) => {
        return err
      })
    })
  },

  getValidatingGuessesByAddress: function (index) {
    return MyGuesses.init(this.address).then(() => {
      return MyGuesses.getValidatingGuessesByAddress(index).catch((err) => {
        return err
      })
    })
  },

  getPastGuessesByAddress: function (index) {
    return MyGuesses.init(this.address).then(() => {
      return MyGuesses.getPastGuessesByAddress(index).catch((err) => {
        return err
      })
    })
  },

  getCreatedGuessesByAddress: function (index) {
    return MyGuesses.init(this.address).then(() => {
      return MyGuesses.getCreatedGuessesByAddress(index).catch((err) => {
        return err
      })
    })
  },

  getEventItemState: function (index) {
    return GuessCore.init().then(() => {
      return GuessCore.getEventItemState(index).catch((err) => {
        return err
      })
    })
  },

  signMessage (msgParams) {
    let from = this.address[0]

    return new Promise((resolve, reject) => {
      window.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from
      }, function (err, result) {
        if (err) reject(console.error(err))
        if (result.error) {
          reject(console.error(result.error.message))
        }
        resolve(result.result)
      })
    })
  }
}

export default GuessHelper
