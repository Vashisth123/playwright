Feature: Login to players Health

    Scenario: Login with valid credentials
        Given I navigate to playersHealth application
        When I login with "kailash.pathak@3pillarglobal.com" and "Test@12345"
        Then I should see home page

    Scenario: Add new client
    When I create new client having name "myTestClient"
    And I search for client having name "myTestClient"
    Then I should see text "View"
    When I click on view button
