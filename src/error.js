class UserNotFoundError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "UserNotFoundError"
    }
}

class GameNotFoundError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "GameNotFoundError"
    }
}

module.exports = { UserNotFoundError, GameNotFoundError }
