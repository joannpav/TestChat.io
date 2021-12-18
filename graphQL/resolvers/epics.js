const { AuthenticationError, UserInputError } = require('appollo-server-errors');
const Epic = require('../../models/Epic');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getEpics() {
            try { 
                const epics = await Epic.find().sort({ createdAt: -1 });
                return epics;
            } catch (err) {
                throw new Error(err);
            }
        },
    }
};