#import "HomeViewController.h"

// author : Daniel Thengvall

@interface HomeViewController ()

@end

@implementation HomeViewController

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 3;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
            
        case 0: {
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
            UIImageView *profile = (UIImageView *)[cell viewWithTag:1];
            profile.image = [UIImage imageNamed:@"profile"];
            return cell;
        }
            
        case 1:
            return [tableView dequeueReusableCellWithIdentifier:@"nameCell" forIndexPath:indexPath];
        default:
        case 2:
            return [tableView dequeueReusableCellWithIdentifier:@"bioCell" forIndexPath:indexPath];
            
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
        case 0:
            return 158;
        case 1:
            return 73;
        default:
        case 2:
            return 173;
    }
}
@end
