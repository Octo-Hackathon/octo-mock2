

class PopulationControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  
    test "should get new API data for population for id 01003" do
     get :show, id: 01003
    assert_response :success
  end
  
    test "should get new API data for population for id 02006" do
     get :show, id: 02006
    assert_response :success
  end
  
  

end
