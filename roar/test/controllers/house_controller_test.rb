require 'test_helper'

class HouseControllerTest < ActionController::TestCase
 
test "should get new API for id 01003" do
     get :show, id: 01003
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_not_equal nil , body["vacancy"]
  end
  
    test "should get new API for id 02006 but with null response" do
     get :show, id: 02006
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_equal nil , body["vacancy"]
  end
  
  test "should not get new API data forhosing for id xyz" do
     get :show, id: 'xyz'
    assert_response :success
    body = JSON.parse(response.body)
    #body["id"].should == ''
    assert_equal nil , body["vacancy"]
  end
end
