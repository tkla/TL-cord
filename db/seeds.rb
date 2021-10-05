# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Users
User.create(username: 'demo', email: 'demodemo@test.com', password:'123456')
User.create(username: 'TheSecond', email: 'theSecond@test.com', password: '123456')
User.create(username: 'Third', email: 'third3@test.com', password: '123456')

#Servers
Server.create(name: 'League', author_id: '1')
Server.create(name: 'Hololive', author_id: '1')
Server.create(name: 'Work', author_id: '3')
Server.create(name: 'Empty', author_id: '3')

#User's Servers (A joins table representing the servers they are a member of)
UserServer.create(user_id: 1, server_id: 1, admin: true)
UserServer.create(user_id: 1, server_id: 2, admin: true)
UserServer.create(user_id: 1, server_id: 3, admin: false)

UserServer.create(user_id: 2, server_id: 1, admin: false)
UserServer.create(user_id: 2, server_id: 2, admin: true)

UserServer.create(user_id: 3, server_id: 1, admin: false)
UserServer.create(user_id: 3, server_id: 3, admin: true)

#Channels
Channel.create(server_id: 1, name: 'League General', author_id: 1, voice_channel: false)
Channel.create(server_id: 1, name: 'Theory Crafting', author_id: 1, voice_channel: false)

Channel.create(server_id: 2, name: 'Hololive General', author_id: 2, voice_channel: false)
Channel.create(server_id: 2, name: 'Glasses', author_id: 1, voice_channel: false)
Channel.create(server_id: 2, name: 'Fubuki', author_id: 1, voice_channel: false)

Channel.create(server_id: 3, name: 'Job Search', author_id: 3, voice_channel: false)

#Posts
Post.create(server_id: 1, channel_id: 1, author_id: 1, 
   body: "Sona AD carry is a good build", original_body: "Sona AD carry is a good build")
Post.create(server_id: 1, channel_id: 1, author_id: 2, 
   body: "I agree brother.", parent_id: 1, original_body: "There is no way.") 

#Large body size test.
Post.create(server_id: 2, channel_id: 4, author_id: 1,
   body: %q["Glasses are really versatile. First, you can have glasses-wearing girls take them off and suddenly become beautiful, 
   or have girls wearing glasses flashing those cute grins, or have girls stealing the protagonist's glasses and putting them on like, 
   "Haha, got your glasses!' That's just way too cute! Also, boys with glasses! 
   I really like when their glasses have that suspicious looking gleam, 
   and it's amazing how it can look really cool or just be a joke. I really like how it can fulfill all those abstract needs. 
   Being able to switch up the styles and colors of glasses based on your mood is a lot of fun too! 
   It's actually so much fun! You have those half rim glasses, or the thick frame glasses, everything! 
   It's like you're enjoying all these kinds of glasses at a buffet. 
   I really want Luna to try some on or Marine to try some on to replace her eyepatch. 
   We really need glasses to become a thing in hololive and start selling them for HoloComi. 
   Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Glasses?"],
   original_body: %q["Glasses are really versatile. First, you can have glasses-wearing girls take them off and suddenly become beautiful, 
   or have girls wearing glasses flashing those cute grins, or have girls stealing the protagonist's glasses and putting them on like, 
   "Haha, got your glasses!' That's just way too cute! Also, boys with glasses! 
   I really like when their glasses have that suspicious looking gleam, 
   and it's amazing how it can look really cool or just be a joke. I really like how it can fulfill all those abstract needs. 
   Being able to switch up the styles and colors of glasses based on your mood is a lot of fun too! 
   It's actually so much fun! You have those half rim glasses, or the thick frame glasses, everything! 
   It's like you're enjoying all these kinds of glasses at a buffet. 
   I really want Luna to try some on or Marine to try some on to replace her eyepatch. 
   We really need glasses to become a thing in hololive and start selling them for HoloComi.
   Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Glasses?"])

Post.create(server_id: 3, channel_id: 6, author_id: 1, 
   body: "Delete test", original_body: "Delete test")
Post.create(server_id: 3, channel_id: 6, author_id: 3, 
   body: "Boba?", original_body: "Boba?")

