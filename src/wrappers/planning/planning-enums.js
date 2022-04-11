/**
 * Planning Event Enums
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
 export const PLANNING_EVENT_TYPES = {
    GET_ALL_TASKS: 'getAllTasks',
    
    CREATE_TASK_REQUESTED: 'craeteTaskRequested',
    CREATE_TASK_REQUEST_ACCEPTED: 'createTaskRequestAccepted',
    CREATE_TASK_REQUEST_REJECTED: 'createTaskRequestRejected',

    START_VOTING_REQUESTED: 'startVotingRequested',
    START_VOTING_REQUEST_ACCEPTED: 'startVotingRequestAccepted',
    START_VOTING_REQUEST_REJECTED: 'startVotingRequestRejected',

    STOP_VOTING_REQUESTED: 'stopVotingRequested',
    STOP_VOTING_REQUEST_ACCEPTED: 'stopVotingRequestAccepted',
    STOP_VOTING_REQUEST_REJECTED: 'stopVotingRequestRejected',

    VOTE_REQUESTED: 'voteRequested',
    VOTE_REQUEST_ACCEPTED: 'voteRequestAccepted',
    VOTE_REQUEST_REJECTED: 'voteRequestRejected',

    GET_ALL_USER_RATING_LIST: 'getAllUserRatingList',
};