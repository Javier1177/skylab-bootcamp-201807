'use strict'

describe('logic (spotify-app)', () => {
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'
            let userId

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(id => userId = id)
            })

            it('should login on correct data', () => {
                return logic.loginUser(username, password)
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userId).toBe(userId)
                        expect(logic._userToken).toBeDefined()
                        expect(logic._userUsername).toBe(username)
                    })
            })
        })

        describe('unregister user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should unregister on correct data', () => {
                return logic.unregisterUser(password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })
        })

        describe('logout user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should logout correctly', () => {
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic._userUsername).toBeDefined()

                logic.logout()

                expect(logic._userId).toBeNull()
                expect(logic._userToken).toBeNull()
                expect(logic._userUsername).toBeNull()
            })
        })

      describe('update user', () => {
        const username = 'robert-anthony-' + Math.random()
        const password = '123'
        const newUsername = "bubbles-" + Math.random();
        const newPassword = "onehundred"

        beforeEach(() => {
          return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .catch(console.error)
        })

        it('should update correctly', () => {
          expect(logic._userId).toBeDefined()
          expect(logic._userToken).toBeDefined()
          expect(logic._userUsername).toBeDefined()
         return logic.updateUser(password,newUsername,newPassword)
           .then((res) => {
             expect(res).toBeTruthy();
             expect(logic._userUsername).toBe(newUsername);
           }).then(()=> {
             return logic.loginUser(newUsername,newPassword)
               .then((res) => {
                 expect(res).toBeTruthy()
               });
           }).catch(console.error)

        })
      })


  describe('store user data', () => {
    let username = 'robert-anthony-' + Math.random()
    const password = '123'
    const dataArray = [{a:"b",c:"d",obj:{something:"else"}}]
    const dataObj = {something:{is:"different"}}
    const dataFieldName = "favorites"

    beforeEach(() => {
      username = 'robert-anthony-' + Math.random()
      return logic.registerUser(username, password)
        .then(() => logic.loginUser(username, password))
        .catch(console.error)
    })

    it('should store an array of data correctly', () => {
      expect(logic._userId).toBeDefined()
      expect(logic._userToken).toBeDefined()
      expect(logic._userUsername).toBeDefined()
      return logic.storeUserData(dataFieldName,dataArray)
        .then((res) => {
          expect(res).toBeTruthy();
        }).then(()=> {
          return logic.retrieveUserData(dataFieldName)
            .then((res) => {
              expect(res).toEqual(dataArray)
            });
        }).catch(console.error)

    })

    it('should store object data correctly', () => {
      expect(logic._userId).toBeDefined()
      expect(logic._userToken).toBeDefined()
      expect(logic._userUsername).toBeDefined()
      return logic.storeUserData(dataFieldName,dataObj)
        .then((res) => {
          expect(res).toBeTruthy();
        }).then(()=> {
          return logic.retrieveUserData(dataFieldName)
            .then((res) => {
              expect(res).toEqual(dataObj)
            });
        }).catch(console.error)

    })
  })

  describe('retrieve user data', () => {
    let username = 'robert-anthony-' + Math.random()
    const password = '123'
    const dataArray = [{a:"b",c:"d"}]
    const dataObj = {something:{is:"different"}}
    const dataFieldNameArray = "favorites"
    const dataFieldNameObject = "favoriteObject"

    beforeEach(() => {
      username = 'robert-anthony-' + Math.random()
      return logic.registerUser(username, password)
        .then(() => logic.loginUser(username, password))
        .then(() => {
          return logic.storeUserData(dataFieldNameArray,dataArray)
        })
        .then(() => {
          return logic.storeUserData(dataFieldNameObject,dataObj)
        })
        .catch(console.error)
    })

    it('should retrieve an array of data correctly', () => {
      expect(logic._userId).toBeDefined()
      expect(logic._userToken).toBeDefined()
      expect(logic._userUsername).toBeDefined()
      return logic.retrieveUserData(dataFieldNameArray)
        .then((res) => {
          expect(res).toEqual(dataArray);
        })
        .catch(console.error)

    })


    it('should retrieve object data correctly', () => {
      expect(logic._userId).toBeDefined()
      expect(logic._userToken).toBeDefined()
      expect(logic._userUsername).toBeDefined()
      return logic.retrieveUserData(dataFieldNameObject)
        .then((res) => {
          expect(res).toEqual(dataObj);
        })
        .catch(console.error)

    })
  })



})

    describe('spotify\'s', () => {
        logic.spotifyToken = 'BQAxdPvRAW0BQoQJN4U8Zu1Vxo6dE58IyzyexBcvjooS9EZpLIcgmMULcYAJ8LfhViobRQyGhIdSMvhSq0cGoe4ZcCRFAbY8HAsbAUhpj4x6ydq7gSFEmd67a_cEBwDznVHGTU54VRz3'

        describe('search artists', () => {
            it('should find artists matching criteria', () => {
                return logic.searchArtists('madonna')
                    .then(artists => {
                        expect(artists).toBeDefined()
                        expect(artists.length).toBe(20)
                        expect(artists[0].name).toBe('Madonna')
                        expect(artists[0].type).toBe('artist')
                    })
            })
        })

        describe('retrieve albums by artist id', () => {
            it('should retrieve albums for given artist id', () => {
                return logic.retrieveAlbumsByArtistId('4BH2S4t8fh9YqRIXnEEDEN')
                    .then(albums => {
                        expect(albums).toBeDefined()
                        expect(albums.length).toBe(3)
                        expect(albums[0].name).toBe('Hunter')
                        expect(albums[0].type).toBe('album')
                    })
            })
        })

        describe('retrieve tracks by album id', () => {
            it('should retrieve tracks for given album id', () => {
                return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2')
                    .then(tracks => {
                        expect(tracks).toBeDefined()
                        expect(tracks.length).toBe(1)
                        expect(tracks[0].name).toBe('Hunter')
                        expect(tracks[0].type).toBe('track')
                    })
            })
        })

        describe('retrieve track by id', () => {
            it('should retrieve track for given id', () => {
                return logic.retrieveTrackById('4QxwXcPUm1VfkHksz6VuFi')
                    .then(track => {
                        expect(track).toBeDefined()
                        expect(track.name).toBe('Hunter')
                        expect(track.type).toBe('track')
                    })
            })
        })
    })
})