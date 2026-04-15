const mongoose = require('mongoose');
const Room = require('./models/Room');

mongoose.connect(process.env.MONGO_URI);

const sampleRooms = [
  {
    name: 'Deluxe Room',
    description: 'Spacious room with king-size bed, Wi-Fi, and balcony view.',
    price: 120,
    image: 'https://source.unsplash.com/featured/?hotel-room,1',
  },
  {
    name: 'Executive Suite',
    description: 'Luxury suite with lounge access and complimentary breakfast.',
    price: 200,
    image: 'https://source.unsplash.com/featured/?hotel-suite,2',
  },
  {
    name: 'Standard Room',
    description: 'Comfortable room with all essential amenities for travelers.',
    price: 80,
    image: 'https://source.unsplash.com/featured/?room,3',
  },
  {
    name: 'Family Suite',
    description: 'Ideal for families, includes extra beds and play area.',
    price: 180,
    image: 'https://source.unsplash.com/featured/?family-room,4',
  },
];

async function seedRooms() {
  try {
    await Room.deleteMany();
    await Room.insertMany(sampleRooms);
    console.log('Rooms added successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding rooms:', err);
  }
}

seedRooms();