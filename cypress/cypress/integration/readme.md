Outline of MVP functionality

Registration
----
DONE - Input username, email, password, and org name
- Send verification email - is this necessary?

User
----
DONE - Can log in / out
- Can reset password

User Profile
- Can delete account
- Can backup all their data
- Can see requests to join their org
- Can invite others to join their org using their email

Orgs
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
- Epics belong to orgs
DONE - User can create a new epic manually
- User can import epic from gitlab
- Epics are listed in the side bar
DONE - Click an epic to view story feed for that epic
- Users of the org can join one or more epics

Stories
----
DONE - Stories belong to epics
DONE - If there are no stories for an epic, a friendly message should be displayed
DONE - Stories can be liked 
- Stories can be approved as a sign that an org member has reviewd
DONE - Stories have scenarios that test the acceptance criteria of the story
DONE - Stories can have comments
DONE - Stories can be deleted
DONE - Stories cannot be edited 

Scenarios
---
- Scenarios are a one liner that describes expected behavior
ie: As a member of an org, I can add a scenario to a story
ie: As an authenticated user, I can approve a scenario
ie: An authenticated user can only navigate to their own org
DONE - Scenarios can be approved
DONE - Scenarios can have comments
DONE - Scenarios can be deleted by the scenario creator
DONE - Scenarios cannot be edited. Protects integrity - approvals not relevant if scenario has changed
DONE - If there are no scenarios for a story, a message should be displayed
DONE - Scenarios can be approved or disapproved
DONE - Approvers/Disapprovers list displayed on hover

Comments
---
DONE - Anyone in an org can comment on a story
DONE - Commenters can delete their own comment only


Integrations
----
Import epics from Gitlab
Import epics from Jira
Export test scenarios to excel 
Export test scenarios as skeleton code

Auditing
-----
Audit log of all user interactions
Audit log available from admin profile only
