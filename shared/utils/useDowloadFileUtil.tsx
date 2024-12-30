import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const useDowloadFileUtil = () => {
  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      // Request permission
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        alert('Permission to access media library denied');
        return;
      }
      const fileUri = FileSystem.documentDirectory + 'downloaded_image.jpg';
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      const album = await MediaLibrary.getAlbumAsync('Downloads');
      if (album === null) {
        await MediaLibrary.createAlbumAsync('Downloads', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      alert('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };

  return { downloadImage };
};

export default useDowloadFileUtil;
