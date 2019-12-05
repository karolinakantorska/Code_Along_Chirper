export const RECEIVE_USERS = 'RECEIVE_USERS'

// exporting receive users action creator

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}
