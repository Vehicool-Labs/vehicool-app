import { faArrowRightFromBracket } from '@fortawesome/pro-light-svg-icons/faArrowRightFromBracket';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { faUserSlash } from '@fortawesome/pro-light-svg-icons/faUserSlash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Alert } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import { useAuthContext } from '../../contexts/auth.context';
import { signOutUser } from '../../services/auth.service';
import { ApiResponseError } from '../../utils/error.util';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, dispatchCurrentUser } = useAuthContext();

  const handleGoToUpdateEmail = () => navigation.navigate('UpdateEmail');
  const handleGoToUpdatePassword = () => navigation.navigate('UpdatePassword');
  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatchCurrentUser(null);
      navigation.navigate('SignIn');
    } catch (error) {
      const apiError: ApiResponseError = error;
      Alert.alert(apiError.cause || 'Erreur', apiError.message, []);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 16 }}>Authentification</Text>
        <Button
          backgroundColor={Colors.transparent}
          onPress={handleGoToUpdateEmail}
          style={{
            borderColor: Colors.light,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Adresse email</Text>
            <Text style={{ fontWeight: 'normal' }}>{currentUser?.email}</Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
        <Button
          backgroundColor={Colors.transparent}
          onPress={handleGoToUpdatePassword}
          style={{
            borderColor: Colors.light,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Mot de passe</Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 16, color: Colors.danger }}>
          Zone de danger
        </Text>
        <Button
          backgroundColor={Colors.transparent}
          onPress={handleSignOut}
          style={{
            borderColor: Colors.danger,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }} color={Colors.danger}>
              Se déconnecter
            </Text>
          </View>
          <FontAwesomeIcon icon={faArrowRightFromBracket} color={Colors.danger} />
        </Button>
        <Button
          backgroundColor={Colors.transparent}
          onPress={handleSignOut}
          style={{
            borderColor: Colors.danger,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }} color={Colors.danger}>
              Supprimer mon compte
            </Text>
          </View>
          <FontAwesomeIcon icon={faUserSlash} color={Colors.danger} />
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
