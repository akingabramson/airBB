task :send_reminders => :environment do
  puts "updating checkins"
  CheckIn.refresh
  puts "done updating checkins"
end