import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { AnimatePresence, MotiView } from 'moti';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  request: NetworkDevToolItem;
};

const RequestCard = React.memo(({ request }: Props) => {
  const [show, setShow] = React.useState(false);
  const methodColor = React.useMemo(() => {
    switch (request.method) {
      case 'post':
        return '#587ad1';

      case 'get':
        return '#b0ab72';

      case 'delete':
        return '#dd6470';

      default:
        return '#e8ad89';
    }
  }, [request.method]);

  return (
    <AnimatePresence>
      <TouchableOpacity onPress={() => setShow((pre) => !pre)}>
        <MotiView
          from={{
            opacity: 0,
            transform: [
              {
                translateX: -Spacing.SPACING_200,
              },
            ],
          }}
          animate={{
            opacity: 1,
            transform: [
              {
                translateX: 0,
              },
            ],
          }}
          exit={{
            opacity: 0,
            transform: [
              {
                translateX: Spacing.SPACING_300,
              },
            ],
          }}
          style={styles.card}
          className="items-center"
        >
          <Stack
            direction="column"
            style={{
              flexGrow: 1,
            }}
          >
            <Typography fontSize={FontSize.FONT_SIZE_14} color="black">
              {request.url}
            </Typography>
            {show && (
              <Stack
                style={{
                  marginTop: Spacing.SPACING_10,
                }}
                direction="column"
              >
                <Typography
                  fontSize={FontSize.FONT_SIZE_12}
                  weight="bold"
                  color="black"
                >
                  {' '}
                  Payload:
                </Typography>
                <Typography fontSize={FontSize.FONT_SIZE_12} color="black">
                  {JSON.stringify(request.payload)}
                </Typography>
                <Typography
                  fontSize={FontSize.FONT_SIZE_12}
                  weight="bold"
                  color="black"
                  style={{
                    marginTop: Spacing.SPACING_10,
                  }}
                >
                  {' '}
                  Response:
                </Typography>
                <Typography fontSize={FontSize.FONT_SIZE_12} color="black">
                  {JSON.stringify(request.response)}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack
            style={{
              paddingHorizontal: Spacing.SPACING_8,
              backgroundColor: methodColor,
              height: Spacing.SPACING_16,
              borderRadius: Spacing.SPACING_3,
            }}
          >
            <Typography
              fontSize={FontSize.FONT_SIZE_12}
              weight="bold"
              style={{
                textTransform: 'uppercase',
              }}
            >
              {request.method}
            </Typography>
          </Stack>
        </MotiView>
      </TouchableOpacity>
    </AnimatePresence>
  );
});

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: Spacing.SPACING_8,
    paddingHorizontal: Spacing.SPACING_8,
    paddingVertical: Spacing.SPACING_8,
  },
});

export default RequestCard;
