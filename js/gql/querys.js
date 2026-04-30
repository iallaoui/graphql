export const querys = {
  infosUser: `
    {
        user{
          login
          attrs
          avatarUrl
          events{
            cohorts{
              userId
              labelName
            }
          }
        }
    }
    `,
  xp: `{
 transaction_aggregate(where:{type:{_eq:"xp"},eventId:{_eq:41}}){
  aggregate{
    sum{
      amount
    }
  }
}
}`,
  level: `{
  transaction(
    where: { type: { _eq: "level" }, eventId: { _eq: 41 } }
    order_by: { id: desc }
    limit: 1
  ) {
    amount
  }
}`,
  Transactions: `{
  transaction(
    where: {type: {_eq: "xp"}, eventId: {_eq: 41}, path: {_nilike: "%checkpoint%"}}
    order_by: {createdAt: desc}
  ) {
    amount
    createdAt
    object {
      progresses {
        group {
          captainLogin
          members(where: {accepted: {_eq: true}}) {
            userLogin
          }
        }
      }
      name
    }
  }
}`,
  auditInfo: `{
  user {
    auditRatio
    audits(
      where: {closureType: {_in: [succeeded, failed]}, group: {eventId: {_eq: 41}}},
      order_by :{createdAt: desc}
    ) {
      closureType
      createdAt
      group {
        eventId
        captainLogin
        pathByPath {
          object {
            name
            type
          }
        }
      }
    }
  }
}`,
  user: `
{
  user{
    login
    lastName
    firstName
  }
}`,
  skills: `{
  transaction(
    where: {
      type: {_ilike: "%skill%"}
    }
    order_by: {amount: desc}
  ) {
    type
    amount
  }
}`
}