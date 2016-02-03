
require 'spec_helper'

feature 'Authentication', js: true do
  feature 'login' do
    scenario 'with valid inputs' do
      @user = FactoryGirl.create(:user)
      visit '/#/login'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("input[type=submit]").click

      expect(page).to have_content('Sign out')
    end
    scenario 'redirect after login' do
      @user = FactoryGirl.create(:confirmed_user)
      visit '/#/login'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Sign in").click

      expect(page).to have_content('Home')
    end
  end
end