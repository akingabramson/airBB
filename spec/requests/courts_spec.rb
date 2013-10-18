require 'spec_helper'

describe "Courts" do
  let(:valid_attrs) {{:name => "The Place",
                    :longitude => -122.00,
                    :latitude => 37.0}}
  describe "GET /courts" do
    it "displays courts" do
      court = Court.create!(valid_attrs)
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get courts_path, {"northeast[latitude]" => 39.0, "northeast[longitude]" =>  -121.5,
                        "southwest[latitude]" => 25.1, "southwest[longitude]" => -124.51
                      }

      response.body.should =~ /The Place/
    end
  end
end
