import { APP_CONFIG } from "../config/appConfig.js";

const { zoneEventId } = APP_CONFIG;

export const queries = {
  userProfile: `
    {
      user {
        login
        attrs
        avatarUrl
        events {
          cohorts {
            userId
            labelName
          }
        }
      }
    }
  `,
  xpTotal: `
    {
      transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: ${zoneEventId} } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  `,
  level: `
    {
      transaction(
        where: { type: { _eq: "level" }, eventId: { _eq: ${zoneEventId} } }
        order_by: { id: desc }
        limit: 1
      ) {
        amount
      }
    }
  `,
  transactions: `
    {
      transaction(
        where: {
          type: { _eq: "xp" }
          eventId: { _eq: ${zoneEventId} }
          path: { _nilike: "%checkpoint%" }
        }
        order_by: { createdAt: desc }
      ) {
        amount
        createdAt
        object {
          progresses {
            group {
              captainLogin
              members(where: { accepted: { _eq: true } }) {
                userLogin
              }
            }
          }
          name
        }
      }
    }
  `,
  auditInfo: `
    {
      user {
        auditRatio
        audits(
          where: { closureType: { _in: [succeeded, failed] }, group: { eventId: { _eq: ${zoneEventId} } } }
          order_by: { createdAt: desc }
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
    }
  `,
  identity: `
    {
      user {
        login
        lastName
        firstName
      }
    }
  `,
  skills: `
    {
      transaction(
        where: { type: { _ilike: "%skill%" } }
        order_by: { amount: desc }
      ) {
        type
        amount
      }
    }
  `,
};
