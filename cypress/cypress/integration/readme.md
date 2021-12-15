Outline of MVP functionality

Registration
----
- Input username, email, password, and group name
- Send verification email - is this necessary?

User
----
- Can log in / out
- Can reset password

User Profile
- Can delete account
- Can backup all their data
- Can see requests to join their org
- Can invite others to join their org using their email

Groups
----
A group is akin to a company or organization. Groups are unique. First user to create a group is
is the admin and they have to approve or invite others
Examples of url per group
https://testchat.io/apple
https://testchat.io/cytosport 

Story URLs will look like:
https://testchat.io/cytosport/story/a3423rfw3

- A user should not be able to access groups other than their own if they change the URL

Epics
----
- User can create a new epic manually or import
- Epics are listed in the side bar
- Click an epic to view story feed for that epic
- Users of the org can join one or more epics

Stories
----
- Stories belong to epics
- If there are no stories for an epic, a friendly message should be displayed
- Stories can be liked / signed off and should be as a sign that all group members have reviewd
- Stories have scenarios that test the acceptance criteria of the story
- Stories can have comments
- Stories can be deleted
- Stories cannot be edited 

Scenarios
---
- Scenarios are a one liner that describes expected behavior
ie: As a member of an org, I can add a scenario to a story
ie: As an authenticated user, I can approve a scenario
ie: An authenticated user can only navigate to their own org
- Scenarios can be approved
- Scenarios can have comments
- Scenarios can be deleted by the scenario creator
- Scenarios cannot be edited. This is to protect the integrety since comments and approvals may not be relevant if the story scenario is changed
- If there are no scenarios for a story, a message should be displayed

Comments
---
- Anyone in an org can comment on a story
- Commenters can delete their own comment only


Integrations
----
Import epics from Gitlab
Import epics from Jira
Export test scenarios to excel 
Export test scenarios as skeleton code
