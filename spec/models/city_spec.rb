require 'rails_helper'

RSpec.describe City, type: :model do
  it '#create' do 
    city = create(:city, name: 'Piauí,BR')
    expect(city.name).to eq('Piauí, BR')
  end
end
