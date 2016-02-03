require 'spec_helper'
require 'faker'

feature 'Registration', js: true do
  let(:email) { Faker::Internet.email }
  let(:name) { Faker::Faker.name }

  feature 'with valid inputs' do
    let(:password) { Faker::Internet.password }

    before do
      visit '/#/register'
      fill_in 'Email', with: email
      fill_in 'Password', with: password
      fill_in 'Username', with: name
      click_on 'Register'
    end

    scenario 'account creation' do
      visit '/#/login'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Sign in").click

      expect(page).to have_content('Sign out')
    end

    scenario 'sign-in upon account creation' do
      expect(page).to have_content('Sign out')
    end
  end

  scenario 'with a too-short password' do
    password = 'a'
    visit '/sign_up'
    fill_in 'Email', with: email
    fill_in 'Password', with: password
    click_on 'Register'

    expect(page).to have_content('Password is too short')
  end
end