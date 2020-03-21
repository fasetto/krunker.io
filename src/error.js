class UserNotFoundError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "UserNotFoundError"
    }
}

class ClanNotFoundError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "ClanNotFoundError"
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

module.exports = { UserNotFoundError, ClanNotFoundError, GameNotFoundError }
