import express from 'express';
import { Scribe } from '../models/scribe.model.js';
import { User } from '../models/user.model.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();

// Get all scribes with user information
router.get('/', async (req, res) => {
  try {
    console.log('Fetching scribes...');

    const scribes = await Scribe.find()
      .populate('user', 'name email phone profile_photo')
      .exec();

      console.log('Found scribes:', scribes.length);

    const scribesWithUser = scribes.map(scribe => ({
      _id: scribe._id,
      user: scribe.user,
      educational_qualification: scribe.educational_qualification,
      reader: scribe.reader,
      writer: scribe.writer,
      online: scribe.online,
      offline: scribe.offline,
      written: scribe.written,
      mcq: scribe.mcq,
      languages: scribe.languages || [],
      state: scribe.state,
      city: scribe.city,
      audio_sample_url: scribe.audio_sample_url,
      writing_sample_url: scribe.writing_sample_url
    }));

    res.status(200).json({
      success: true,
      scribes: scribesWithUser
    });
  } catch (error) {
    console.error('Error fetching scribes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching scribes',
      error: error.message
    });
  }
});

export default router;