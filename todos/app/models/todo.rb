ActiveRecord::Base.include_root_in_json = false
class Todo < ActiveRecord::Base
  attr_accessible :title, :done
end
