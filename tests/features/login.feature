Feature: Login to players Health

    Scenario: Login with valid credentials
        Given I navigate to playersHealth application
        When I login with "kailash.pathak@3pillarglobal.com" and "Test@12345"
        Then I should see home page

    Scenario: Add new client
    When I create new client having name "dataset"
    And I search for client having name "dataset"
    Then I should see text "dataset"
    When I click on view button
    When I add program having name "newProg"