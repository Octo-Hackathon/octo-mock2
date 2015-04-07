require 'test_helper'

class PopulationControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  test "should get new API data for population for id 01003" do
     get :show, id: 01003
     
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_not_equal nil , body["race"]
  end
  
    test "should get new API data for population for id 02006 but with null response" do
     get :show, id: 02006
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_equal nil , body["race"]
  end
   test "should not get new API data for population for id xyz" do
     get :show, id: 'xyz'
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_equal nil , body["race"]
  end
end
