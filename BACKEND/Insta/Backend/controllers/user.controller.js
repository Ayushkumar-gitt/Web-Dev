const followModel = require("../Models/follow.model")
const userModel = require("../Models/user.model")

async function followUserController(request, response) {
    const followerUsername = request.user.username // The one who follows, Eg - Ayush
    const followeeUsername = request.params.username // The one who is being followed, Eg - Ashish

    if (followeeUsername == followerUsername) {
        return response.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    //checks if followee exists or not
    const followeeExists = await userModel.findOne({ username: followeeUsername })
    console.log(followeeExists);

    if (!followeeExists) {
        return response.status(404).json({
            message: "The follower you are trying to follow doesn't exists"
        })
    }

    // Checks If user is already following the followee
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {
        return response.status(404).json({
            message: `You are already following ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    }) // So Ayush follows Ashish in this example

    response.status(201).json({
        message: `You are now following ${followeeUsername}`,
        followRecord
    })
}

async function unfollowUserController(request, response) {
    const followerUsername = request.user.username // The one who follows, Eg - Ayush
    const followeeUsername = request.params.username // The one who is being followed, Eg - Ashish

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isAlreadyFollowing) {
        return response.status(404).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isAlreadyFollowing._id)

    response.status(200).json({
        message: `You have successfully unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}