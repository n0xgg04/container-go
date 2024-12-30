import { useMutation } from '@tanstack/react-query';
import { UploadS3 } from '@/shared/features/home/upload-photos';

type Props = {
  fileType: $FileType;
  fileName: string;
};
export default function useUploadS3() {
  return useMutation({
    mutationFn: async ({ fileType, fileName }: Props) => {
      return UploadS3(fileType, fileName);
    },
    mutationKey: ['UPLOAD_S3]'],
  });
}
