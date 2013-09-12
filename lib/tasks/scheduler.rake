task :refresh_checkins => :environment do
  puts "updating checkins"
  CheckIn.refresh
  puts "done updating checkins"
end